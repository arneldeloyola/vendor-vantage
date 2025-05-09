// src/composables/system/useVendor.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export function useVendor() {
  const search = ref('')
  const vendors = ref([])
  const loading = ref(false)

  // Table headers definition
  const headers = [
    { title: 'Business Name', key: 'shop_name' },
    { title: 'Contact', key: 'contact_number' },
    { title: 'Email', key: 'email' },
    { title: 'Bookings', key: 'bookings' },
    { title: 'Join Date', key: 'created_at' },
    { title: 'Status', key: 'profile_status' },
    { title: 'Actions', key: 'actions', sortable: false },
  ]

  // Filter vendors based on search term
  const filteredVendors = computed(() => {
    if (!search.value) return vendors.value
    return vendors.value.filter((v) =>
      v.shop_name.toLowerCase().includes(search.value.toLowerCase()),
    )
  })

  // Fetch vendors data from Supabase
  const fetchVendors = async () => {
    loading.value = true

    try {
      // First fetch all vendors
      const { data: vendorData, error: vendorError } = await supabase.from('vendors').select(`
          id,
          shop_name,
          contact_number,
          profile_status,
          created_at,
          user_id
        `)

      if (vendorError) {
        console.error('Error fetching vendors:', vendorError)
        return
      }

      // If no vendors found, set empty array and exit
      if (!vendorData || vendorData.length === 0) {
        vendors.value = []
        loading.value = false
        return
      }

      // Extract user IDs to get emails in a single query
      const userIds = vendorData.map((vendor) => vendor.user_id).filter(Boolean)

      // Get emails for all users in one go (more efficient)
      let userEmails = {}
      try {
        // Try using auth.users directly
        const { data: usersData } = await supabase
          .from('auth.users') // Try without 'auth.' prefix
          .select('id, email')
          .in('id', userIds)

        if (usersData && usersData.length) {
          usersData.forEach((user) => {
            userEmails[user.id] = user.email
          })
        }
      } catch (error) {
        console.warn('Could not get user emails:', error.message)
        // Fallback: Just use N/A for all emails
      }

      // Get booking counts for all vendors in parallel
      const bookingCounts = await Promise.all(
        vendorData.map((vendor) =>
          supabase
            .from('vendor_bookings')
            .select('', { count: 'exact', head: true })
            .eq('vendor_id', vendor.id)
            .then(({ count }) => ({ vendorId: vendor.id, count: count || 0 }))
            .catch(() => ({ vendorId: vendor.id, count: 0 })),
        ),
      )

      // Convert to a lookup object
      const bookingsLookup = {}
      bookingCounts.forEach((item) => {
        bookingsLookup[item.vendorId] = item.count
      })

      // Format the vendors data
      const formatted = vendorData.map((vendor) => {
        return {
          id: vendor.id,
          shop_name: vendor.shop_name,
          contact_number: vendor.contact_number,
          email: userEmails[vendor.user_id] || 'N/A',
          bookings: bookingsLookup[vendor.id] || 0,
          created_at: new Date(vendor.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          profile_status: vendor.profile_status,
        }
      })

      vendors.value = formatted
    } catch (err) {
      console.error('Unexpected error in fetchVendors:', err)
      vendors.value = []
    } finally {
      loading.value = false
    }
  }

  // Vendor action handlers
  const viewDetails = (item) => {
    console.log('Viewing:', item)
    // Implement view details logic here
  }

  const verifyVendor = async (item) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ profile_status: 'verified', updated_at: new Date().toISOString() })
        .eq('id', item.id)

      if (error) {
        console.error('Error verifying vendor:', error)
        return false
      }

      // Refresh the vendors list
      await fetchVendors()
      return true
    } catch (err) {
      console.error('Unexpected error in verifyVendor:', err)
      return false
    }
  }

  return {
    search,
    vendors,
    headers,
    filteredVendors,
    fetchVendors,
    viewDetails,
    verifyVendor,
    loading,
  }
}
