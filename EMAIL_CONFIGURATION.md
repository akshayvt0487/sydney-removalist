# Email Configuration Summary

**Last Updated:** 2026-03-03

---

## Current Email Configuration

### Recipients

- **TO**: info@nationalremovalist.com (Primary notification recipient)
- **BCC**: akshay@dsigns.com.au, basheer@dsigns.com.au (Hidden copies)
- **FROM**: Sydney Removalist <noreply@sydneyremovalist.com.au> (Verified domain)

### Email Service

- **Provider**: Resend
- **Domain**: sydneyremovalist.com.au (✅ Verified)
- **API Key**: Configured in Supabase Edge Function secrets
- **Edge Function**: `send-quote-notification`

---

## Testing Email Configuration

### Safe Testing Script

Use the test script to verify email delivery:

```bash
node scripts/test-email-send.mjs
```

**Important**: This script only sends TEST data with clear markers:
- Name: "Test User (DO NOT CONTACT)"
- Email: test@example.com
- Phone: 0400 000 000
- Additional Details: "⚠️ TEST EMAIL - No action required"

### Never Include Real User Data in Tests

❌ **DO NOT**:
- Send real customer information in test emails
- Expose real names, emails, or phone numbers
- Use actual submission data for testing

✅ **DO**:
- Use clearly marked test data
- Include "TEST" or "DO NOT CONTACT" in test submissions
- Use fake email addresses like test@example.com

---

## Form Types

### 1. Quote Request Emails

**Subject**: New Quote Request from [Name]

**Includes**:
- Contact Information (name, email, phone)
- Move Details (from, to, size)
- Schedule (date, preferred time)
- Additional Details (if provided)
- Link to Admin Dashboard

### 2. Contact Form Emails

**Subject**: New Contact Form: [Subject] from [Name]

**Includes**:
- Contact Information (name, email, phone)
- Enquiry Subject
- Message content
- Link to Admin Dashboard

---

## Environment Variables

These can be overridden in Supabase Edge Function secrets:

```bash
# Primary recipient (TO field)
NOTIFICATION_EMAILS=info@nationalremovalist.com

# BCC recipients (hidden copies)
BCC_EMAILS=akshay@dsigns.com.au,basheer@dsigns.com.au

# From address (must use verified domain)
FROM_EMAIL=Sydney Removalist <noreply@sydneyremovalist.com.au>

# Resend API Key
RESEND_API_KEY=re_***************************
```

### How to Update Environment Variables

```bash
npx supabase secrets set NOTIFICATION_EMAILS="new@email.com"
npx supabase secrets set BCC_EMAILS="bcc1@email.com,bcc2@email.com"
npx supabase secrets set FROM_EMAIL="Company Name <noreply@domain.com>"
```

After updating secrets, redeploy the function:

```bash
npx supabase functions deploy send-quote-notification
```

---

## Deployment Status

- ✅ Edge Function deployed
- ✅ Domain verified in Resend
- ✅ Email recipients configured
- ✅ BCC functionality active
- ✅ Both form types integrated

---

## Monitoring

### Check Email Delivery

1. **Resend Dashboard**: https://resend.com/emails
   - View sent emails
   - Check delivery status
   - Monitor bounce rates

2. **Supabase Dashboard**: https://supabase.com/dashboard/project/zbqzjtbjdepgwmnbskbu/functions
   - View function logs
   - Monitor invocations
   - Check for errors

### Common Issues

**Emails not arriving?**
1. Check spam/junk folders
2. Verify domain is active in Resend
3. Check Resend dashboard for delivery status
4. Ensure FROM email uses verified domain

**BCC not working?**
1. Verify BCC_EMAILS environment variable is set
2. Check that BCC email addresses are valid
3. Review Resend dashboard logs

---

## Data Privacy

- ❌ Never include real user data in test scripts
- ✅ Customer data only sent in production form submissions
- ✅ All email transmission encrypted (TLS)
- ✅ API keys stored securely in Supabase secrets
- ✅ No customer data logged in console

---

## Support

For email delivery issues:
1. Check Resend dashboard first
2. Review Edge Function logs
3. Test with test-email-send.mjs script
4. Contact Resend support if domain verification fails

---

**Created:** 2026-03-03
**Status:** ✅ Active and Operational
