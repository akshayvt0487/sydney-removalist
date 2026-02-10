import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteFormData {
  formType?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  movingFrom?: string;
  movingTo?: string;
  movingDate?: string;
  movingTime?: string;
  moveSize?: string;
  additionalDetails?: string;
  subject?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: QuoteFormData = await req.json();
    const isContactForm = formData.formType === 'contact';
    
    console.log(`Received ${isContactForm ? 'contact' : 'quote'} form data:`, formData);

    let emailHtml: string;
    let emailSubject: string;

    if (isContactForm) {
      // Contact Form Email Template
      emailSubject = `New Contact Form: ${formData.subject || 'General Enquiry'} from ${formData.fullName}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a5f; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            📬 New Contact Form Submission
          </h1>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <strong style="color: #92400e;">Form Type:</strong> Contact Form
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${formData.phoneNumber}">${formData.phoneNumber}</a></p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Enquiry Details</h2>
            <p><strong>Subject:</strong> ${formData.subject || 'General Enquiry'}</p>
          </div>
          
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0369a1; margin-top: 0;">Message</h2>
            <p style="white-space: pre-wrap;">${formData.message || 'No message provided'}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>This contact form was submitted via the Sydney Removalist website.</p>
            <p>View all submissions in the <a href="https://www.sydneyremovalist.com.au/dashboard">Admin Dashboard</a></p>
          </div>
        </div>
      `;
    } else {
      // Quote Form Email Template
      emailSubject = `New Quote Request from ${formData.fullName}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a5f; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            📦 New Quote Request
          </h1>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <strong style="color: #1e40af;">Form Type:</strong> Quote Request
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${formData.phoneNumber}">${formData.phoneNumber}</a></p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Move Details</h2>
            <p><strong>Moving From:</strong> ${formData.movingFrom || 'Not specified'}</p>
            <p><strong>Moving To:</strong> ${formData.movingTo || 'Not specified'}</p>
            <p><strong>Move Size:</strong> ${formData.moveSize || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Schedule</h2>
            <p><strong>Date:</strong> ${formData.movingDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${formData.movingTime || 'Not specified'}</p>
          </div>
          
          ${formData.additionalDetails ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #92400e; margin-top: 0;">Additional Details</h2>
            <p>${formData.additionalDetails}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>This quote request was submitted via the Sydney Removalist website.</p>
            <p>View all submissions in the <a href="https://www.sydneyremovalist.com.au/dashboard">Admin Dashboard</a></p>
          </div>
        </div>
      `;
    }

    // Get recipient emails from environment variable (comma-separated list)
    // Example: "email1@example.com,email2@example.com,email3@example.com"
    const notificationEmailsEnv = Deno.env.get("NOTIFICATION_EMAILS") || Deno.env.get("NOTIFICATION_EMAIL") || "akshay@dsigns.com.au";
    const recipientEmails = notificationEmailsEnv.split(',').map(email => email.trim()).filter(email => email.length > 0);
    const fromEmail = Deno.env.get("FROM_EMAIL") || "Sydney Removalist <onboarding@resend.dev>";

    console.log(`Sending email to: ${recipientEmails.join(', ')}`);

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: recipientEmails,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
