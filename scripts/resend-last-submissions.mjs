import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbqzjtbjdepgwmnbskbu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g'

const supabase = createClient(supabaseUrl, supabaseKey)

async function resendLastTwoSubmissions() {
  try {
    // Get the last 2 form submissions
    const { data: submissions, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2)

    if (error) {
      console.error('Error fetching submissions:', error)
      return
    }

    if (!submissions || submissions.length === 0) {
      console.log('No submissions found')
      return
    }

    console.log(`Found ${submissions.length} submission(s) to resend:\n`)

    // Resend each submission
    for (const submission of submissions) {
      console.log(`\n📧 Resending ${submission.form_type} form from ${submission.full_name}`)
      console.log(`   Submitted: ${new Date(submission.created_at).toLocaleString()}`)

      const payload = {
        formType: submission.form_type,
        fullName: submission.full_name,
        email: submission.email,
        phoneNumber: submission.phone_number,
      }

      // Add form-specific fields
      if (submission.form_type === 'contact') {
        payload.subject = submission.subject
        payload.message = submission.additional_details
      } else if (submission.form_type === 'quote') {
        payload.movingFrom = submission.moving_from
        payload.movingTo = submission.moving_to
        payload.movingDate = submission.moving_date
        payload.movingTime = submission.moving_time
        payload.moveSize = submission.move_size
        payload.additionalDetails = submission.additional_details
      }

      // Invoke the edge function to send the email
      const { data, error: functionError } = await supabase.functions.invoke(
        'send-quote-notification',
        { body: payload }
      )

      if (functionError) {
        console.error(`   ❌ Error sending email:`, functionError)
      } else {
        console.log(`   ✅ Email sent successfully`)
        console.log(`   Recipients: info@nationalremovalist.com`)
        console.log(`   BCC: akshay@dsigns.com.au, basheer@dsigns.com.au`)
      }
    }

    console.log('\n✨ Done!')
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

resendLastTwoSubmissions()
