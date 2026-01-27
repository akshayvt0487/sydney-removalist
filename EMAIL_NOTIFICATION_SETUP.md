# Email Notification Setup Guide

This guide will help you set up email notifications for form submissions using Resend and Supabase Edge Functions.

## Overview

The system is already configured to send email notifications when:
- A customer submits a quote request
- A customer submits a contact form

Emails are sent using **Resend** (email service) via a **Supabase Edge Function**.

---

## Step 1: Set Up Resend Account

### 1.1 Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 1.2 Get Your API Key
1. Log in to your Resend dashboard
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name like "Sydney Removalist Notifications"
5. Copy the API key (you'll need this later)- re_2PZMXx4X_CchMycFJsodKFTHN1ifGJur3

### 1.3 Add Your Domain (Optional but Recommended)
For production use, you should verify your domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `sydneyremovalist.com.au`)
4. Follow the DNS verification steps
5. Once verified, you can send emails from addresses like `noreply@sydneyremovalist.com.au`

**Note:** For testing, you can use Resend's test domain `onboarding@resend.dev`

---

## Step 2: Configure Supabase Edge Function

### 2.1 Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (`zbqzjtbjdepgwmnbskbu`)
3. Navigate to **Edge Functions** in the left sidebar

### 2.2 Set Environment Variables
1. Click on **Edge Functions** → **Settings**
2. Scroll to **Secrets** section
3. Add the following environment variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key | Required for sending emails |
| `NOTIFICATION_EMAILS` | `email1@example.com,email2@example.com` | Comma-separated list of emails to notify |
| `FROM_EMAIL` | `Sydney Removalist <noreply@sydneyremovalist.com.au>` | The "From" address for notifications |

### Example Values:

```bash
RESEND_API_KEY=re_abc123xyz...
NOTIFICATION_EMAILS=akshay@dsigns.com.au,admin@sydneyremovalist.com.au,manager@company.com
FROM_EMAIL=Sydney Removalist <noreply@sydneyremovalist.com.au>
```

**Important Notes:**
- Use commas to separate multiple email addresses (no spaces)
- The system will automatically send to all listed emails
- You can add or remove emails anytime by updating the `NOTIFICATION_EMAILS` variable

---

## Step 3: Deploy the Edge Function

### Option A: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not already installed):
```bash
npm install -g supabase
```

2. **Login to Supabase**:
```bash
supabase login
```

3. **Link to your project**:
```bash
supabase link --project-ref zbqzjtbjdepgwmnbskbu
```

4. **Deploy the function**:
```bash
supabase functions deploy send-quote-notification
```

### Option B: Manual Deployment via Dashboard

1. Go to **Edge Functions** in Supabase Dashboard
2. Click **Create function**
3. Name it `send-quote-notification`
4. Copy the code from `supabase/functions/send-quote-notification/index.ts`
5. Paste it into the editor
6. Click **Deploy**

---
,
## Step 4: Test the Email Notifications

### 4.1 Submit a Test Form
1. Go to your website
2. Fill out either:
   - A quote request form, OR
   - A contact form
3. Submit the form

### 4.2 Check Email Delivery
1. Check the email inbox(es) you configured in `NOTIFICATION_EMAILS`
2. You should receive a formatted email with the submission details

### 4.3 Check Logs (If Email Not Received)
1. Go to Supabase Dashboard → **Edge Functions**
2. Click on `send-quote-notification`
3. Go to **Logs** tab
4. Look for any errors

Common issues:
- Invalid Resend API key
- Email addresses not configured correctly
- Domain not verified in Resend (if using custom domain)

---

## Step 5: Managing Notification Recipients

### Adding Email Recipients

To add more people to receive notifications:

1. Go to Supabase Dashboard → **Edge Functions** → **Settings** → **Secrets**
2. Find the `NOTIFICATION_EMAILS` variable
3. Edit it and add new email addresses separated by commas:

```
akshay@dsigns.com.au,newperson@example.com,another@example.com
```

4. Save the changes
5. The function will automatically use the new list for all future notifications

### Removing Email Recipients

Follow the same process, but remove the email address from the comma-separated list.

---

## Email Template Customization

The email templates are defined in `supabase/functions/send-quote-notification/index.ts`.

### Quote Request Email Template
- Includes: Customer info, move details, schedule, and additional notes
- Color scheme: Blue theme

### Contact Form Email Template
- Includes: Customer info, subject, and message
- Color scheme: Yellow/amber theme

To customize the templates:
1. Edit the `emailHtml` variable in the function code
2. Modify the HTML/CSS as needed
3. Redeploy the function

---

## Monitoring and Maintenance

### Check Email Delivery Stats
1. Log in to your Resend dashboard
2. Go to **Emails** to see delivery status
3. Check for bounces, opens, and clicks

### View Supabase Function Logs
1. Supabase Dashboard → **Edge Functions** → `send-quote-notification` → **Logs**
2. Monitor for any errors or issues

### Email Sending Limits

**Resend Free Tier:**
- 100 emails per day
- 3,000 emails per month

For higher limits, upgrade to a paid Resend plan.

---

## Troubleshooting

### Issue: Emails not being received

**Check:**
1. ✅ Resend API key is correct in Supabase secrets
2. ✅ `NOTIFICATION_EMAILS` variable is set correctly (no typos)
3. ✅ Email addresses are comma-separated (no spaces)
4. ✅ Check spam/junk folder
5. ✅ Verify domain in Resend (if using custom domain)

**View logs:**
```bash
supabase functions logs send-quote-notification
```

### Issue: Function not being called

**Check:**
1. Form is submitting successfully to database
2. Forms are calling `supabase.functions.invoke('send-quote-notification', ...)`
3. No errors in browser console

### Issue: Invalid FROM email

If using a custom domain for the FROM address, make sure:
1. Domain is added and verified in Resend
2. `FROM_EMAIL` environment variable uses the verified domain

**Example:** If you verified `sydneyremovalist.com.au`:
```
FROM_EMAIL=Sydney Removalist <noreply@sydneyremovalist.com.au>
```

---

## Production Checklist

Before going live:

- [ ] Resend account created and verified
- [ ] Domain verified in Resend (optional but recommended)
- [ ] `RESEND_API_KEY` set in Supabase secrets
- [ ] `NOTIFICATION_EMAILS` set with correct email addresses
- [ ] `FROM_EMAIL` set with verified domain email
- [ ] Edge function deployed successfully
- [ ] Test email sent and received
- [ ] Spam folder checked
- [ ] All team members added to notification list
- [ ] Email template reviewed and approved
- [ ] Resend sending limits adequate for your needs

---

## Quick Reference

### Environment Variables Summary

```bash
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Notification Recipients (comma-separated, no spaces)
NOTIFICATION_EMAILS=email1@example.com,email2@example.com,email3@example.com

# Sender Email (optional, defaults to Resend test domain)
FROM_EMAIL=Sydney Removalist <noreply@sydneyremovalist.com.au>
```

### Deploy Command

```bash
supabase functions deploy send-quote-notification
```

### View Logs

```bash
supabase functions logs send-quote-notification
```

---

## Support

- **Resend Documentation**: [https://resend.com/docs](https://resend.com/docs)
- **Supabase Edge Functions**: [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
- **Project Repository**: Check `supabase/functions/send-quote-notification/index.ts` for the function code

---

**Last Updated:** 2026-01-27
