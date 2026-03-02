import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbqzjtbjdepgwmnbskbu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicXpqdGJqZGVwZ3dtbmJza2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk0NDcsImV4cCI6MjA3OTczNTQ0N30.Zb_HDHhgx6R-n3njltUr_lxZnGB0bg2yoN82ztJ8v4g'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSubmissions() {
  try {
    const { data: submissions, error, count } = await supabase
      .from('form_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching submissions:', error)
      return
    }

    console.log(`Total submissions in database: ${count}`)

    if (submissions && submissions.length > 0) {
      console.log('\nAll submissions:')
      submissions.forEach((sub, idx) => {
        console.log(`\n${idx + 1}. ${sub.form_type} - ${sub.full_name}`)
        console.log(`   Email: ${sub.email}`)
        console.log(`   Phone: ${sub.phone_number}`)
        console.log(`   Submitted: ${new Date(sub.created_at).toLocaleString()}`)
        if (sub.form_type === 'contact') {
          console.log(`   Subject: ${sub.subject}`)
        } else {
          console.log(`   From: ${sub.moving_from}`)
          console.log(`   To: ${sub.moving_to}`)
        }
      })
    } else {
      console.log('\nNo submissions found in the database.')
    }
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

checkSubmissions()
