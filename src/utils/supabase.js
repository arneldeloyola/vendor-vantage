import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

//Form Action Utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

// Check if the session exist and is valid; Return false if there's an error
export const isAuthenticated = async () => {
  const { data: { session } = {}, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error.message)
    return false
  }

  if (session) {
    console.log('Session exists:', session)
    return true
  }

  return false
}

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Vendor related queries
export const getVendorProfile = async () => {
  const { data: user } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('user_id', user.user.id)
    .single()

  if (error) {
    console.error('Error fetching vendor profile:', error)
    return null
  }

  return data
}

// Booking related queries
export const getVendorBookings = async (vendorId) => {
  const { data, error } = await supabase
    .from('vendors_bookings')
    .select(
      `
      *,
      booths(
        *,
        events(*)
      )
    `,
    )
    .eq('vendor_id', vendorId)

  if (error) {
    console.error('Error fetching vendor bookings:', error)
    return []
  }

  return data
}

// Events related queries
export const getAvailableEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select(
      `
      *,
      booths(
        id,
        number,
        is_available
      )
    `,
    )
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching available events:', error)
    return []
  }

  return data
}

// Payment status helper
export const getPaymentStatus = async (bookingId) => {
  const { data, error } = await supabase
    .from('vendors_bookings')
    .select('payment, status')
    .eq('id', bookingId)
    .single()

  if (error) {
    console.error('Error fetching payment status:', error)
    return { status: 'unknown', amount: 0 }
  }

  return data
}

// Count available booths for an event
export const getAvailableBoothCount = async (eventId) => {
  const { data, error, count } = await supabase
    .from('booths')
    .select('*', { count: 'exact' })
    .eq('event_id', eventId)
    .eq('is_available', true)

  if (error) {
    console.error('Error counting available booths:', error)
    return 0
  }

  return count
}

// Book a booth
export const bookBooth = async (vendorId, boothId, paymentAmount = 0) => {
  const { data, error } = await supabase
    .from('vendors_bookings')
    .insert([
      {
        vendor_id: vendorId,
        booth_id: boothId,
        status: paymentAmount > 0 ? 'pending_payment' : 'confirmed',
        payment: paymentAmount,
      },
    ])
    .select()

  if (error) {
    console.error('Error booking booth:', error)
    return { success: false, error }
  }

  // Update booth availability
  await supabase.from('booths').update({ is_available: false }).eq('id', boothId)

  return { success: true, data }
}

// Complete payment
export const completePayment = async (bookingId) => {
  const { data, error } = await supabase
    .from('vendors_bookings')
    .update({
      status: 'confirmed',
      payment: 0,
    })
    .eq('id', bookingId)
    .select()

  if (error) {
    console.error('Error completing payment:', error)
    return { success: false, error }
  }

  return { success: true, data }
}

// Cancel booking
export const cancelBooking = async (bookingId, boothId) => {
  // Get the booking first to confirm booth_id
  const { data: booking } = await supabase
    .from('vendors_bookings')
    .select('booth_id')
    .eq('id', bookingId)
    .single()

  if (booking) {
    // Delete the booking
    const { error } = await supabase.from('vendors_bookings').delete().eq('id', bookingId)

    if (error) {
      console.error('Error canceling booking:', error)
      return { success: false, error }
    }

    // Update booth availability
    await supabase.from('booths').update({ is_available: true }).eq('id', booking.booth_id)

    return { success: true }
  }

  return { success: false, error: 'Booking not found' }
}
