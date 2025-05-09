import { formActionDefault, supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

export function useLogin() {
  const router = useRouter()

  // Add loginAsAdmin toggle here as reactive object
  const formData = reactive({
    email: '',
    password: '',
    loginAsAdmin: false,
  })

  const formAction = reactive({
    ...formActionDefault,
  })

  const refVForm = ref(null)

  const onSubmit = async () => {
    // Reset Form Action utils
    Object.assign(formAction, { ...formActionDefault, formProcess: true })

    try {
      console.log('Login attempt with:', {
        email: formData.email,
        isAdmin: formData.loginAsAdmin,
      })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        console.error('Auth error:', error)
        formAction.formErrorMessage = error.message
        formAction.formStatus = error.status
      } else if (data && data.user) {
        console.log('Auth success, user data:', data.user)

        // Get admin status from metadata
        const isAdminFlag = Boolean(data.user.user_metadata?.is_admin)
        console.log('Is admin from metadata:', isAdminFlag)
        console.log('Selected admin login:', formData.loginAsAdmin)

        if (isAdminFlag !== formData.loginAsAdmin) {
          console.log('Role mismatch, logging out')
          await supabase.auth.signOut()
          formAction.formErrorMessage = formData.loginAsAdmin
            ? 'Access denied: You are not an admin.'
            : 'Admins must use the admin login.'
        } else {
          console.log('Login successful, redirecting based on role:', isAdminFlag)
          formAction.formSuccessMessage = 'Successfully Logged In.'

          // Delay redirect to ensure message is shown
          setTimeout(() => {
            const route = formData.loginAsAdmin ? '/admin/dashboard' : '/dashboard'
            console.log('Redirecting to:', route)
            router.replace(route)
          }, 500)
        }
      }
    } catch (err) {
      console.error('Unexpected login error:', err)
      formAction.formErrorMessage = 'An unexpected error occurred during login.'
    } finally {
      formAction.formProcess = false
    }
  }

  const onFormSubmit = async () => {
    try {
      const validation = await refVForm.value?.validate()
      console.log('Form validation result:', validation)

      if (validation && validation.valid) {
        await onSubmit()
      }
    } catch (err) {
      console.error('Form validation error:', err)
      formAction.formErrorMessage = 'Form validation failed'
      formAction.formProcess = false
    }
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
