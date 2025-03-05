import React, { useState, useRef } from 'react';
import { 
  Search, 
  Upload, 
  LayoutGrid, 
  Home, 
  Briefcase, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Slack, 
  HelpCircle, 
  FileCode, 
  ExternalLink, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  AlertCircle,
  Globe,
  Link2,
  Type,
  Image,
  FileSearch,
  Code2,
  Smartphone,
  Gauge,
  Shield,
  FileUp,
  Download
} from 'lucide-react';

type TabType = 'single' | 'bulk' | 'sitemap';
type AnalysisState = 'idle' | 'analyzing' | 'complete';

interface SEOMetrics {
  title: string;
  description: string;
  score: number;
}

function App() {
  // Tab and form state
  const [activeTab, setActiveTab] = useState<TabType>('single');
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis results state
  const [score, setScore] = useState(72);
  const [testsPassed, setTestsPassed] = useState(18);
  const [criticalIssues, setCriticalIssues] = useState(3);
  const [urlsAnalyzed, setUrlsAnalyzed] = useState(1);
  
  // SEO Metrics state
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics[]>([]);
  
  // UI state
  const [expandedOutput, setExpandedOutput] = useState(true);
  const [expandedSuggested, setExpandedSuggested] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFileName(file.name);
        // Here you would typically parse the CSV file
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setBulkUrls(text);
        };
        reader.readAsText(file);
      } else {
        setError('Please upload a CSV file');
      }
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export functionality here
    console.log(`Exporting as ${format}`);
  };

  const handleAnalysis = async () => {
    setError('');
    
    // Validate input based on active tab
    if (activeTab === 'single' && !url) {
      setError('Please enter a URL to analyze');
      return;
    } else if (activeTab === 'bulk' && !bulkUrls && !uploadedFileName) {
      setError('Please enter URLs or upload a CSV file');
      return;
    } else if (activeTab === 'sitemap' && !sitemapUrl) {
      setError('Please enter a sitemap URL');
      return;
    }

    setAnalysisState('analyzing');

    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update stats with "analyzed" data
    setScore(Math.floor(Math.random() * 30) + 70);
    setTestsPassed(Math.floor(Math.random() * 5) + 20);
    setCriticalIssues(Math.floor(Math.random() * 3) + 1);
    setUrlsAnalyzed(activeTab === 'single' ? 1 : Math.floor(Math.random() * 10) + 2);

    // Set mock SEO metrics
    setSeoMetrics([
      { title: 'Title Tag', description: 'Title length is optimal', score: 95 },
      { title: 'Meta Description', description: 'Description could be more descriptive', score: 75 },
      { title: 'URL Structure', description: 'URL is SEO friendly', score: 100 },
      { title: 'Heading Tags', description: 'H1 tag is missing', score: 60 },
      { title: 'Image Alt Tags', description: '3 images missing alt tags', score: 70 },
      { title: 'Content Length', description: 'Content is thin (under 300 words)', score: 45 },
      { title: 'Keyword Density', description: 'Primary keyword density is optimal', score: 90 },
      { title: 'Mobile Responsiveness', description: 'Page is mobile friendly', score: 100 },
      { title: 'Page Load Speed', description: 'Page loads in under 3 seconds', score: 85 },
      { title: 'SSL Certificate', description: 'HTTPS is properly configured', score: 100 }
    ]);

    setAnalysisState('complete');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'single':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  id="website-url"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="target-keywords" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Keywords
                </label>
                <input
                  type="text"
                  id="target-keywords"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="keyword1, keyword2, keyword3"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Analysis Depth
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                  <option value="basic">Basic Analysis</option>
                  <option value="advanced">Advanced Analysis</option>
                  <option value="technical">Technical SEO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'bulk':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload CSV File
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileUp className="h-5 w-5 mr-2" />
                  Choose File
                </button>
                {uploadedFileName && (
                  <span className="text-sm text-gray-600">{uploadedFileName}</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="bulk-urls" className="block text-sm font-medium text-gray-700 mb-1">
                Or Enter URLs (one per line)
              </label>
              <textarea
                id="bulk-urls"
                className="w-full p-3 border border-gray-300 rounded-md h-32"
                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analysis Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md">
                <option value="full">Full Analysis</option>
                <option value="quick">Quick Scan</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-5 w-5 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        );
      case 'sitemap':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="sitemap-url" className="block text-sm font-medium text-gray-700 mb-1">
                Sitemap URL
              </label>
              <input
                type="text"
                id="sitemap-url"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="https://example.com/sitemap.xml"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crawl Depth
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                  <option value="1">Level 1 (Homepage only)</option>
                  <option value="2">Level 2 (Homepage + Direct Links)</option>
                  <option value="3">Level 3 (Deep Crawl)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crawl Speed
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                  <option value="normal">Normal</option>
                  <option value="slow">Slow (Server Friendly)</option>
                  <option value="fast">Fast (High Performance)</option>
                </select>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <span className="text-lg font-medium">SEO On-Page Audit</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            <span className="text-sm">GSC Connected</span>
          </div>

          <button className="w-full bg-gray-200 text-gray-700 rounded py-2 px-4 flex items-center justify-center mb-4">
            <Zap size={16} className="mr-2" />
            Upgrade
          </button>

          <div className="bg-gray-200 h-2 rounded-full mb-2">
            <div className="bg-gray-400 h-2 rounded-full w-[72%]"></div>
          </div>
          <div className="text-xs text-center text-gray-500 mb-6">100/110 Credits</div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center text-gray-700 p-2 rounded bg-gray-100">
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
              <Globe size={18} className="mr-3" />
              <span>Site Analysis</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
              <FileText size={18} className="mr-3" />
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
              <CreditCard size={18} className="mr-3" />
              <span>Billing</span>
            </a>
          </nav>

          <div className="mt-6 space-y-2">
            <button className="w-full bg-gray-100 text-gray-700 rounded py-2 px-4 flex items-center justify-center">
              <MessageSquare size={16} className="mr-2" />
              Support Chat
            </button>
            <button className="w-full bg-gray-100 text-gray-700 rounded py-2 px-4 flex items-center justify-center">
              <HelpCircle size={16} className="mr-2" />
              Documentation
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">SEO On-Page Audit</h1>
            <p className="text-gray-600">Comprehensive analysis of your webpage's SEO elements</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('single')}
                className={`flex items-center px-6 py-3 font-medium transition-colors ${
                  activeTab === 'single' 
                    ? 'bg-gray-100 text-gray-800 border-b-2 border-gray-800' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Search size={18} className="mr-2" />
                Single URL
                <span className="text-xs ml-2 text-gray-500">Analyze one page</span>
              </button>
              <button 
                onClick={() => setActiveTab('bulk')}
                className={`flex items-center px-6 py-3 font-medium transition-colors ${
                  activeTab === 'bulk' 
                    ? 'bg-gray-100 text-gray-800 border-b-2 border-gray-800' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Upload size={18} className="mr-2" />
                Bulk Analysis
                <span className="text-xs ml-2 text-gray-500">Multiple URLs</span>
              </button>
              <button 
                onClick={() => setActiveTab('sitemap')}
                className={`flex items-center px-6 py-3 font-medium transition-colors ${
                  activeTab === 'sitemap' 
                    ? 'bg-gray-100 text-gray-800 border-b-2 border-gray-800' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid size={18} className="mr-2" />
                Sitemap
                <span className="text-xs ml-2 text-gray-500">XML sitemap scan</span>
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {renderTabContent()}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                  <AlertCircle size={18} className="mr-2" />
                  {error}
                </div>
              )}

              <button 
                onClick={handleAnalysis}
                disabled={analysisState === 'analyzing'}
                className={`mt-6 bg-[#7B32E3] text-white px-5 py-2 rounded-md flex items-center hover:bg-[#6422c4] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {analysisState === 'analyzing' ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    Start Analysis
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-800">{score}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="mt-2 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-[#7B32E3] h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-800">{testsPassed}/25</div>
              <div className="text-sm text-gray-600">Tests Passed</div>
              <div className="mt-2 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-[#7B32E3] h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(testsPassed/25) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-800">{criticalIssues}</div>
              <div className="text-sm text-gray-600">Critical Issues</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-800">{urlsAnalyzed}</div>
              <div className="text-sm text-gray-600">URLs Analyzed</div>
            </div>
          </div>

          {/* SEO Metrics Grid */}
          {analysisState === 'complete' && (
            <div className="grid grid-cols-2 gap-6 mb-6">
              {seoMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{metric.title}</h3>
                    <span className={`text-sm font-medium ${
                      metric.score >= 90 ? 'text-green-600' :
                      metric.score >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>{metric.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                  <div className="mt-2 bg-gray-200 h-2 rounded-full">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        metric.score >= 90 ? 'bg-green-500' :
                        metric.score >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analysis Modules */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Analysis Details</h2>
                <p className="text-sm text-gray-600">Comprehensive SEO analysis results</p>
              </div>

              <div className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer" onClick={() => setExpandedOutput(!expandedOutput)}>
                <h3 className="font-medium">Technical SEO</h3>
                {expandedOutput ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>

              {expandedOutput && (
                <div className="p-4 bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Meta Information</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Title Tag: Optimize your title length (currently 45 characters)</li>
                        <li>Meta Description: Add more relevant keywords</li>
                        <li>Canonical URL: Properly implemented</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Content Analysis</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Content Length: 1,200 words (Good)</li>
                        <li>Keyword Density: Primary keyword appears 12 times (2.1%)</li>
                        <li>Readability Score: 65/100 (Intermediate)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Technical Factors</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Page Load Speed: 2.3s (Desktop), 3.1s (Mobile)</li>
                        <li>Mobile Responsiveness: Fully Responsive</li>
                        <li>SSL Certificate: Valid and Secure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-gray-200 flex justify-between items-center cursor-pointer" onClick={() => setExpandedSuggested(!expandedSuggested)}>
                <h3 className="font-medium">Recommendations</h3>
                {expandedSuggested ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>

              {expandedSuggested && (
                <div className="p-4 bg-gray-50">
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <h4 className="font-medium text-yellow-800 mb-2">High Priority</h4>
                      <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                        <li>Optimize meta description with target keywords</li>
                        <li>Add alt text to 3 missing images</li>
                        <li>Improve mobile page load speed</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="font-medium text-blue-800 mb-2">Opportunities</h4>
                      <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                        <li>Add more internal links to related content</li>
                        <li>Implement schema markup for better rich snippets</li>
                        <li>Consider adding FAQ section for featured snippets</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            Made with ❤️ by AllAboutAI
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;