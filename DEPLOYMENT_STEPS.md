# Email Notification System - Deployment Steps

**Date:** 2026-01-28
**Status:** Ready to Deploy

---

## Prerequisites

You already have:
- ✅ Supabase project set up
- ✅ Edge Function code ready at [supabase/functions/send-quote-notification/index.ts](supabase/functions/send-quote-notification/index.ts)
- ✅ Resend API key: `re_2PZMXx4X_CchMycFJsodKFTHN1ifGJur3`
- ✅ Forms integrated with Edge Function calls

---

## Step 1: Log in to Supabase CLI

Run this command in your terminal:

```bash
npx supabase login
```

This will:
1. Open your browser for authentication
2. Ask you to authorize the Supabase CLI
3. Store your access token locally

**Expected Output:**
```
Finished supabase login.
```

---

## Step 2: Link Your Project

After logging in, link to your Supabase project:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

**To find your Project Reference ID:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click on **Settings** (gear icon)
4. Go to **General**
5. Copy the **Project Reference ID** (looks like: `zbqzjtbjdepgwmnbskbu`)

**Example:**
```bash
npx supabase link --project-ref zbqzjtbjdepgwmnbskbu
```

**Expected Output:**
```
Finished supabase link.
```

---

## Step 3: Set Environment Variables (Secrets)

Set the required secrets for your Edge Function:

### 3.1 Set Resend API Key

```bash
npx supabase secrets set RESEND_API_KEY=re_2PZMXx4X_CchMycFJsodKFTHN1ifGJur3
```

### 3.2 Set Notification Email Addresses

**Important:** Provide a comma-separated list of emails that should receive notifications.

```bash
npx supabase secrets set NOTIFICATION_EMAILS="your-email@example.com,another-email@example.com"
```

**Example:**
```bash
npx supabase secrets set NOTIFICATION_EMAILS="akshay@dsigns.com.au,admin@sydneyremovalist.com.au"
```

### 3.3 Set From Email (Optional)

If you have a verified domain in Resend, use your custom email:

```bash
npx supabase secrets set FROM_EMAIL="Sydney Removalist <quotes@sydneyremovalist.com.au>"
```

**Or use the default Resend test email** (if not set, defaults to `Sydney Removalist <onboarding@resend.dev>`):

```bash
npx supabase secrets set FROM_EMAIL="Sydney Removalist <onboarding@resend.dev>"
```

**Verify secrets are set:**

```bash
npx supabase secrets list
```

**Expected Output:**
```
RESEND_API_KEY
NOTIFICATION_EMAILS
FROM_EMAIL
```

---

## Step 4: Deploy the Edge Function

Deploy the `send-quote-notification` function:

```bash
npx supabase functions deploy send-quote-notification
```

**Expected Output:**
```
Deploying send-quote-notification (project ref: YOUR_PROJECT_REF)
✓ Deployed Function send-quote-notification in 2s
URL: https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-quote-notification
```

---

## Step 5: Verify Deployment

Check that the function is deployed successfully:

```bash
npx supabase functions list
```

**Expected Output:**
```
┌──────────────────────────┬─────────┬──────────────────────────────────┐
│ Name                     │ Status  │ URL                              │
├──────────────────────────┼─────────┼──────────────────────────────────┤
│ send-quote-notification  │ ACTIVE  │ https://...supabase.co/functions │
└──────────────────────────┴─────────┴──────────────────────────────────┘
```

---

## Step 6: Test Email Notifications

### Method 1: Test via Website Forms

1. **Go to your demo site:** https://demo.sydneyremovalist.com.au/
2. **Open the Quote Form** (click "Get a Free Quote" button)
3. **Fill out the form** with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: 0412345678
   - Moving From: Sydney CBD
   - Moving To: Bondi
   - Date: Tomorrow's date
   - Time: Morning
   - Size: 2 Bedroom Apartment
4. **Submit the form**
5. **Check your email(s)** - You should receive a notification within 1-2 minutes

### Method 2: Test Contact Form

1. **Go to:** https://demo.sydneyremovalist.com.au/contact
2. **Fill out the contact form**:
   - Name: Test Contact
   - Email: test@example.com
   - Phone: 0412345678
   - Subject: Test Subject
   - Message: This is a test message
3. **Submit the form**
4. **Check your email(s)**

### Method 3: Check Function Logs

Monitor the function logs in real-time:

```bash
npx supabase functions logs send-quote-notification --follow
```

You'll see:
- Incoming requests
- Email sending attempts
- Success or error messages

**Example Output:**
```
2026-01-28T10:30:45.123Z [INFO] Received quote form data: {...}
2026-01-28T10:30:45.456Z [INFO] Sending email to: akshay@dsigns.com.au, admin@sydneyremovalist.com.au
2026-01-28T10:30:46.789Z [INFO] Email sent successfully: {...}
```

---

## Step 7: Verify in Resend Dashboard

1. **Log in to Resend:** https://resend.com/emails
2. **Go to Emails section**
3. **You should see:**
   - Your test emails listed
   - Delivery status (Sent/Delivered/Bounced)
   - Open/click tracking (if enabled)

---

## Troubleshooting

### Issue: "Access token not provided"

**Solution:** Run `npx supabase login` first

### Issue: "Project not linked"

**Solution:** Run `npx supabase link --project-ref YOUR_PROJECT_REF`

### Issue: Emails not being received

**Check:**
1. Verify secrets are set: `npx supabase secrets list`
2. Check function logs: `npx supabase functions logs send-quote-notification`
3. Verify Resend API key is valid in Resend dashboard
4. Check spam/junk folder
5. Verify email addresses are correct (no typos)

### Issue: "Failed to send email"

**Possible Causes:**
1. Invalid Resend API key
2. Unverified sender domain (if using custom domain)
3. Recipient email address invalid
4. Resend account limits reached

**Solution:**
- Check Resend dashboard for errors
- Use `onboarding@resend.dev` sender for testing
- View function logs for detailed error messages

### Issue: CORS errors in browser console

**Cause:** Edge Function CORS headers already configured correctly in code

**If still occurs:**
- Check browser console for exact error
- Verify Supabase URL environment variables in your app
- Check network tab for request/response details

---

## Environment Variables Summary

After deployment, these secrets are configured:

| Secret | Value | Purpose |
|--------|-------|---------|
| `RESEND_API_KEY` | `re_2PZMXx4X_CchMycFJsodKFTHN1ifGJur3` | Authenticate with Resend API |
| `NOTIFICATION_EMAILS` | Comma-separated email list | Who receives form notifications |
| `FROM_EMAIL` | `Sydney Removalist <email@domain>` | Sender email address |

---

## Production Checklist

Before going live on https://sydneyremovalist.com.au:

- [ ] Verify domain in Resend (for custom sender email)
- [ ] Update `FROM_EMAIL` to use verified domain
- [ ] Test all forms on demo site
- [ ] Verify emails arrive within 1-2 minutes
- [ ] Check email formatting in different email clients
- [ ] Set up email forwarding rules (if needed)
- [ ] Add additional notification emails if needed
- [ ] Monitor function logs for errors
- [ ] Set up Resend webhooks (optional, for delivery tracking)

---

## Next Steps After Email Notifications

1. **Monitor Initial Performance**
   - Check Resend email logs daily for first week
   - Review bounce/complaint rates
   - Adjust notification settings if needed

2. **Consider Future Enhancements**
   - Auto-reply emails to customers
   - Email templates for different quote statuses
   - SMS notifications for urgent quotes
   - Slack/Discord integration for real-time alerts

3. **SEO Tasks Still Pending**
   - Create `/public/og-default.jpg` (1200x630px)
   - Add Google Search Console verification code
   - Update business address in schema markup

---

**Ready to Deploy!** Follow the steps above in order, and your email notification system will be live.

---

**Last Updated:** 2026-01-28
**Created By:** Claude AI Assistant
