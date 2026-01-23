"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Download, RefreshCw, Trash2, MapPin, Calendar, Clock, User,
  Phone, Mail, FileText, ChevronDown, ChevronUp, Package,
  MessageSquare, Loader2, LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';
import { Database } from '@/integrations/supabase/types';

type FormSubmission = Database['public']['Tables']['form_submissions']['Row'];

export default function AdminClient() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'quote' | 'contact'>('all');

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    toast({ title: "Signed out", description: "See you soon!" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      setDeletingId(id);
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });

      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete submission",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev =>
        prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
      );

      toast({
        title: "Status Updated",
        description: `Status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    const dataToExport = filteredSubmissions;
    if (dataToExport.length === 0) {
      toast({
        title: "No data",
        description: "No submissions to export",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      'Created At',
      'Form Type',
      'Full Name',
      'Email',
      'Phone',
      'Subject',
      'Moving From',
      'Moving To',
      'Moving Date',
      'Moving Time',
      'Move Size',
      'Additional Details',
      'Status'
    ];

    const csvRows = [
      headers.join(','),
      ...dataToExport.map(sub => [
        format(new Date(sub.created_at!), 'yyyy-MM-dd HH:mm:ss'),
        sub.form_type || 'quote',
        `"${sub.full_name}"`,
        sub.email,
        sub.phone_number,
        `"${sub.subject || ''}"`,
        `"${sub.moving_from || ''}"`,
        `"${sub.moving_to || ''}"`,
        sub.moving_date || '',
        sub.moving_time || '',
        sub.move_size || '',
        `"${sub.additional_details || ''}"`,
        sub.status
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `form-submissions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: `Exported ${dataToExport.length} submissions`,
    });
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'quoted': return 'bg-purple-500';
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getFormTypeBadge = (formType: string) => {
    if (formType === 'contact') {
      return (
        <Badge className="bg-amber-500 text-white">
          <MessageSquare className="w-3 h-3 mr-1" />
          Contact Form
        </Badge>
      );
    }
    return (
      <Badge className="bg-primary text-primary-foreground">
        <Package className="w-3 h-3 mr-1" />
        Quote Request
      </Badge>
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filterType === 'all') return true;
    return (sub.form_type || 'quote') === filterType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage form submissions</p>
          </div>
          <Button onClick={signOut} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={handleExportCSV} variant="default" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button onClick={fetchSubmissions} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>

          <div className="flex gap-2 ml-auto">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              All ({submissions.length})
            </Button>
            <Button
              variant={filterType === 'quote' ? 'default' : 'outline'}
              onClick={() => setFilterType('quote')}
            >
              Quotes ({submissions.filter(s => (s.form_type || 'quote') === 'quote').length})
            </Button>
            <Button
              variant={filterType === 'contact' ? 'default' : 'outline'}
              onClick={() => setFilterType('contact')}
            >
              Contact ({submissions.filter(s => s.form_type === 'contact').length})
            </Button>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">No submissions found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getFormTypeBadge(submission.form_type)}
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status || 'new'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{submission.full_name}</CardTitle>
                      <CardDescription>
                        Submitted {format(new Date(submission.created_at!), 'PPpp')}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(submission.id)}
                      >
                        {expandedId === submission.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${submission.email}`} className="hover:underline">
                        {submission.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${submission.phone_number}`} className="hover:underline">
                        {submission.phone_number}
                      </a>
                    </div>
                  </div>

                  {expandedId === submission.id && (
                    <div className="space-y-4 mt-4 pt-4 border-t">
                      {submission.form_type === 'contact' && submission.subject && (
                        <div>
                          <p className="text-sm font-semibold mb-1">Subject:</p>
                          <p className="text-sm">{submission.subject}</p>
                        </div>
                      )}

                      {submission.moving_from && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold">Moving From:</p>
                            <p className="text-sm">{submission.moving_from}</p>
                          </div>
                        </div>
                      )}

                      {submission.moving_to && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold">Moving To:</p>
                            <p className="text-sm">{submission.moving_to}</p>
                          </div>
                        </div>
                      )}

                      {submission.moving_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">
                            <span className="font-semibold">Date:</span> {submission.moving_date}
                          </p>
                        </div>
                      )}

                      {submission.moving_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">
                            <span className="font-semibold">Time:</span> {submission.moving_time}
                          </p>
                        </div>
                      )}

                      {submission.move_size && (
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">
                            <span className="font-semibold">Move Size:</span> {submission.move_size}
                          </p>
                        </div>
                      )}

                      {submission.additional_details && (
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold">Additional Details:</p>
                            <p className="text-sm whitespace-pre-wrap">{submission.additional_details}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-4">
                        <select
                          value={submission.status || 'new'}
                          onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                          className="px-3 py-1 rounded-md border bg-background text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(submission.id)}
                          disabled={deletingId === submission.id}
                          className="gap-2"
                        >
                          {deletingId === submission.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
