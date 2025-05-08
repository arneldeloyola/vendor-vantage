// src/composables/useAdminDashboard.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export function useAdminDashboard() {
  // Refs
  const totalEvents = ref(0)
  const activeEvents = ref(0)
  const totalVendors = ref(0)
  const newVendorsThisMonth = ref(0)
  const activeBookings = ref(0)
  const pendingBookings = ref(0)
  const recentBookings = ref([])
  const upcomingEvents = ref([])

  // Computed stats for cards
  const stats = computed(() => [
    {
      title: 'Total Events',
      value: totalEvents.value.toString(),
      subtitle: `${activeEvents.value} active events`,
      icon: 'mdi-calendar',
      iconColor: 'teal',
      linkTo: '/admin/event',
      linkText: 'Manage event',
    },
    {
      title: 'Registered Vendors',
      value: totalVendors.value.toString(),
      subtitle: `${newVendorsThisMonth.value} new this month`,
      icon: 'mdi-account-group-outline',
      iconColor: 'teal',
      linkTo: '/admin/vendor',
      linkText: 'View vendor',
    },
    {
      title: 'Active Bookings',
      value: activeBookings.value.toString(),
      subtitle: `${pendingBookings.value} pending approval`,
      icon: 'mdi-book-account',
      iconColor: 'teal',
      linkTo: '/admin/booking',
      linkText: 'Manage booking',
    },
  ])

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    // EVENTS
    const { count: totalEventCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
    totalEvents.value = totalEventCount || 0

    const { count: activeEventCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    activeEvents.value = activeEventCount || 0

    // VENDORS
    const { count: totalVendorCount } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true })
    totalVendors.value = totalVendorCount || 0

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    const { count: newVendorCount } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth)
    newVendorsThisMonth.value = newVendorCount || 0

    // BOOKINGS
    const { count: activeBookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
    activeBookings.value = activeBookingCount || 0

    const { count: pendingBookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending')
    pendingBookings.value = pendingBookingCount || 0

    // RECENT BOOKINGS (limit 3)
    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('id, status, vendors(name), events(name)')
      .order('created_at', { ascending: false })
      .limit(3)

    recentBookings.value =
      bookingsData?.map((b) => ({
        vendor: b.vendors?.name || 'Unknown Vendor',
        details: `${b.events?.name || 'Event'} - Booking #${b.id}`,
        status: b.status,
      })) || []

    // UPCOMING EVENTS (within 30 days)
    const today = new Date()
    const nextMonth = new Date()
    nextMonth.setDate(today.getDate() + 30)
    const { data: eventsData } = await supabase
      .from('events')
      .select('name, date, location, booths_left')
      .gte('date', today.toISOString())
      .lte('date', nextMonth.toISOString())
      .order('date', { ascending: true })

    upcomingEvents.value = eventsData || []
  }

  return {
    totalEvents,
    activeEvents,
    totalVendors,
    newVendorsThisMonth,
    activeBookings,
    pendingBookings,
    recentBookings,
    upcomingEvents,
    stats,
    fetchDashboardData,
  }
}
