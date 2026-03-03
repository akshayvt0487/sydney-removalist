import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbqzjtbjdepgwmnbskbu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testEmailSend() {
  console.log('🧪 Testing email send with new configuration...\n')
  console.log('⚠️  This sends a TEST email with fake data only.\n')

  const payload = {
    formType: 'quote',
    fullName: 'Test User (DO NOT CONTACT)',
    email: 'test@example.com',
    phoneNumber: '0400 000 000',
    movingFrom: 'Test Address, Sydney NSW',
    movingTo: 'Test Destination, Sydney NSW',
    movingDate: '2026-12-31',
    movingTime: 'Morning (8am-12pm)',
    moveSize: '2 Bedroom Apartment',
    additionalDetails: '⚠️ TEST EMAIL - This is a test submission to verify email configuration. No action required.'
  }

  console.log('📤 Sending TEST email with fake data...')
  console.log('Expected recipients:')
  console.log('  TO: info@nationalremovalist.com')
  console.log('  BCC: akshay@dsigns.com.au, basheer@dsigns.com.au\n')

  try {
    const { data, error } = await supabase.functions.invoke(
      'send-quote-notification',
      { body: payload }
    )

    if (error) {
      console.error('❌ Error:', error)
      console.error('Full error details:', JSON.stringify(error, null, 2))
    } else {
      console.log('✅ Success!')
      console.log('Response:', JSON.stringify(data, null, 2))
      console.log('\n💡 Check your email inbox for the test message.')
      console.log('   Subject: New Quote Request from Test User (DO NOT CONTACT)')
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testEmailSend()
