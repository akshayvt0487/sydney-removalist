import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbqzjtbjdepgwmnbskbu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g'

const supabase = createClient(supabaseUrl, supabaseKey)

// Data from the screenshots
const submissions = [
  {
    fullName: 'Manu Gupta',
    email: 'manasvigupta26@gmail.com',
    phoneNumber: '0434766947',
    submittedAt: 'Mar 1, 2026, 10:01:18 AM',
    formType: 'quote'
  },
  {
    fullName: 'Daniel Knight',
    email: 'danielknight03031983@gmail.com',
    phoneNumber: '0432434555',
    submittedAt: 'Mar 1, 2026, 4:35:04 AM',
    formType: 'quote'
  }
]

async function resendSubmissions() {
  console.log('🔄 Resending emails for 2 quote submissions...\n')

  for (const submission of submissions) {
    console.log(`\n📧 Processing: ${submission.fullName}`)
    console.log(`   Email: ${submission.email}`)
    console.log(`   Phone: ${submission.phoneNumber}`)
    console.log(`   Submitted: ${submission.submittedAt}`)

    // Create payload - since we don't have full details, send with minimal info
    const payload = {
      formType: 'quote',
      fullName: submission.fullName,
      email: submission.email,
      phoneNumber: submission.phoneNumber,
      movingFrom: 'Not available in records',
      movingTo: 'Not available in records',
      movingDate: submission.submittedAt.split(',')[0],
      movingTime: 'Not specified',
      moveSize: 'Not specified',
      additionalDetails: 'This is a resend of a previous submission. Original details may not be included.'
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        'send-quote-notification',
        { body: payload }
      )

      if (error) {
        console.error(`   ❌ Error:`, error.message)
      } else {
        console.log(`   ✅ Email sent successfully!`)
        console.log(`   TO: info@nationalremovalist.com`)
        console.log(`   BCC: akshay@dsigns.com.au, basheer@dsigns.com.au`)
      }
    } catch (err) {
      console.error(`   ❌ Unexpected error:`, err.message)
    }

    // Small delay between emails
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n✨ Done! Check your inboxes.')
}

resendSubmissions()
