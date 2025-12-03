'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, RefreshCw, Trash2, MapPin, Calendar, Clock, User, Phone, Mail, FileText, ChevronDown, ChevronUp, Package, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';

interface FormSubmission {
  id: string;
  form_type: string;
  moving_from: string | null;
  moving_to: string | null;
  moving_date: string | null;
  moving_time: string | null;
  move_size: string | null;
  full_name: string;
  phone_number: string;
  email: string;
  subject: string | null;
  additional_details: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'quote' | 'contact'>('all');
  const { toast } = useToast();

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

  useEffect(() => {
    fetchSubmissions();
  }, []);

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
        description: Status changed to ,
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
        format(new Date(sub.created_at), 'yyyy-MM-dd HH:mm:ss'),
        sub.form_type || 'quote',
        "",
        sub.email,
        sub.phone_number,
        "",
        "",
        "",
        sub.moving_date || '',
        sub.moving_time || '',
        sub.move_size || '',
        "",
        sub.status
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', orm-submissions-.csv);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: Exported  submissions,
    });
  };

  const getStatusColor = (status: string) => {
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

  const quoteCount = submissions.filter(s => (s.form_type || 'quote') === 'quote').length;
  const contactCount = submissions.filter(s => s.form_type === 'contact').length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <Card className="shadow-xl">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Manage form submissions ({submissions.length} total)
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={fetchSubmissions} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={w-4 h-4 mr-2 } />
                    Refresh
                  </Button>
                  <Button onClick={handleExportCSV} variant="outline" size="sm" disabled={filteredSubmissions.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={signOut} variant="destructive" size="sm">
                    Sign Out
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All ({submissions.length})
                </Button>
                <Button
                  variant={filterType === 'quote' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('quote')}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Quotes ({quoteCount})
                </Button>
                <Button
                  variant={filterType === 'contact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('contact')}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contacts ({contactCount})
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Spinner size="lg" />
                  <span className="ml-3 text-muted-foreground">Loading submissions...</span>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground">No submissions yet</h3>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    {filterType === 'all' ? 'Form submissions will appear here' : No  submissions found}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => {
                    const isContactForm = submission.form_type === 'contact';
                    
                    return (
                      <div 
                        key={submission.id} 
                        className="border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
                      >
                        <div 
                          className="p-4 cursor-pointer flex items-center justify-between gap-4 hover:bg-muted/50"
                          onClick={() => toggleExpand(submission.id)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="hidden sm:flex flex-col items-center justify-center bg-muted rounded-lg p-2 min-w-[60px]">
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(submission.created_at), 'MMM')}
                              </span>
                              <span className="text-xl font-bold">
                                {format(new Date(submission.created_at), 'dd')}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-lg truncate">{submission.full_name}</h3>
                                {getFormTypeBadge(submission.form_type || 'quote')}
                                <Badge className={${getStatusColor(submission.status)} text-white}>
                                  {submission.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1 truncate">
                                {isContactForm 
                                  ? Subject: 
                                  : ${submission.moving_from || 'N/A'}  
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(submission.id);
                              }}
                              variant="ghost"
                              size="sm"
                              disabled={deletingId === submission.id}
                            >
                              {deletingId === submission.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-destructive" />
                              )}
                            </Button>
                            {expandedId === submission.id ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>

                        {expandedId === submission.id && (
                          <div className="border-t bg-muted/30 p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  Contact Information
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                    <User className="w-5 h-5 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Full Name</p>
                                      <p className="font-medium">{submission.full_name}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Phone Number</p>
                                      <a 
                                        href={	el:} 
                                        className="font-medium text-primary hover:underline"
                                      >
                                        {submission.phone_number}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Email Address</p>
                                      <a 
                                        href={mailto:} 
                                        className="font-medium text-primary hover:underline break-all"
                                      >
                                        {submission.email}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  {isContactForm ? 'Enquiry Details' : 'Move Details'}
                                </h4>
                                <div className="space-y-2">
                                  {isContactForm ? (
                                    <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                                      <MessageSquare className="w-5 h-5 text-amber-600 mt-0.5" />
                                      <div>
                                        <p className="text-xs text-muted-foreground">Subject</p>
                                        <p className="font-medium">{submission.subject || 'General Enquiry'}</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                                        <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">Moving From</p>
                                          <p className="font-medium">{submission.moving_from || 'Not specified'}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                                        <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">Moving To</p>
                                          <p className="font-medium">{submission.moving_to || 'Not specified'}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                        <Package className="w-5 h-5 text-primary" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">Move Size</p>
                                          <p className="font-medium">{submission.move_size || 'Not specified'}</p>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  {isContactForm ? 'Status' : 'Schedule & Status'}
                                </h4>
                                <div className="space-y-2">
                                  {!isContactForm && (
                                    <>
                                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">Moving Date</p>
                                          <p className="font-medium">
                                            {submission.moving_date 
                                              ? format(new Date(submission.moving_date), 'EEEE, MMMM dd, yyyy')
                                              : 'Not specified'
                                            }
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">Moving Time</p>
                                          <p className="font-medium">{submission.moving_time || 'Not specified'}</p>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  <div className="p-3 bg-background rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-2">Update Status</p>
                                    <select
                                      value={submission.status}
                                      onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                                      className="w-full px-3 py-2 border rounded-md bg-background text-sm"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <option value="new">New</option>
                                      <option value="contacted">Contacted</option>
                                      <option value="quoted">Quoted</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="completed">Completed</option>
                                      <option value="cancelled">Cancelled</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {submission.additional_details && (
                              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-200 uppercase tracking-wide mb-2 flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  {isContactForm ? 'Message' : 'Additional Details'}
                                </h4>
                                <p className="text-amber-900 dark:text-amber-100 whitespace-pre-wrap">
                                  {submission.additional_details}
                                </p>
                              </div>
                            )}

                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                              Submitted on {format(new Date(submission.created_at), 'EEEE, MMMM dd, yyyy \'at\' h:mm a')}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;