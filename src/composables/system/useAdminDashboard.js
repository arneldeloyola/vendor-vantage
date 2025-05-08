// src/composables/useAdminDashboard.js

import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

// Utility function to get event status
const getStatus = (startDate, endDate) => {
  const today = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (today < start) return 'Upcoming'
  else if (today >= start && today <= end) return 'Active'
  else return 'Completed'
}

export function useAdminDashboard() {
  const totalEvents = ref(0)
  const activeEvents = ref(0)
  const totalVendors = ref(0)
  const newVendorsThisMonth = ref(0)
  const activeBookings = ref(0)
  const pendingBookings = ref(0)
  const recentBookings = ref([])
  const upcomingEvents = ref([])

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

  const fetchDashboardData = async () => {
    // EVENTS
    const { data: allEventsData, count: totalEventCount } = await supabase
      .from('events')
      .select('id, start_date, end_date', { count: 'exact' })

    totalEvents.value = totalEventCount || 0

    const activeCount =
      allEventsData?.filter((e) => getStatus(e.start_date, e.end_date) === 'Active').length || 0
    activeEvents.value = activeCount

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

    // RECENT BOOKINGS
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

    // UPCOMING EVENTS (next 30 days)
    const today = new Date()
    const nextMonth = new Date()
    nextMonth.setDate(today.getDate() + 30)

    const { data: eventsData } = await supabase
      .from('events')
      .select('name, start_date, location, booths_left')
      .gte('start_date', today.toISOString())
      .lte('start_date', nextMonth.toISOString())
      .order('start_date', { ascending: true })

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
