
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Card type definition
type ServerCard = {
  id: string;
  name: string;
  description: string;
  type: 'framework' | 'reference' | 'third-party' | 'community';
  tags: string[];
  rating: number;
  extraTags?: string[];
};

// Server cards data
const serverCards: ServerCard[] = [
  {
    id: 'fastmcp',
    name: 'FastMCP',
    description: 'A TypeScript framework for building MCP servers quickly and efficiently.',
    type: 'framework',
    tags: ['Framework', 'TypeScript', 'Development'],
    rating: 4.9,
    extraTags: ['+1 more']
  },
  {
    id: 'everart',
    name: 'EverArt',
    description: 'AI image generation using various models',
    type: 'reference',
    tags: ['AI', 'Image Generation', 'Models'],
    rating: 4.8
  },
  {
    id: 'apify',
    name: 'Apify',
    description: 'Actors MCP Server: Use 3,000+ pre-built cloud tools to extract data from websites, e-commerce, social media...',
    type: 'third-party',
    tags: ['Data Extraction', 'Web Scraping', 'Automation'],
    rating: 4.8,
    extraTags: ['+1 more']
  },
  {
    id: 'aws-kb',
    name: 'AWS KB Retrieval',
    description: 'Retrieval from AWS Knowledge Base using Bedrock Agent Runtime',
    type: 'reference',
    tags: ['AWS', 'AI', 'Knowledge Base'],
    rating: 4.7,
    extraTags: ['+1 more']
  },
  {
    id: 'everything',
    name: 'Everything',
    description: 'Reference / test server with prompts, resources, and tools',
    type: 'reference',
    tags: ['Testing', 'Tools', 'Prompts'],
    rating: 4.6,
    extraTags: ['+1 more']
  },
  {
    id: '21st-dev',
    name: '21st.dev Magic',
    description: 'Create crafted UI components inspired by the best 21st.dev design engineers.',
    type: 'third-party',
    tags: ['UI', 'Design', 'Components'],
    rating: 4.6,
    extraTags: ['+1 more']
  },
  {
    id: 'brave-search',
    name: 'Brave Search',
    description: 'Web and local search using Brave\'s Search API',
    type: 'reference',
    tags: ['Search', 'Web', 'API'],
    rating: 4.5
  },
  {
    id: 'fetch',
    name: 'Fetch',
    description: 'Web content fetching and conversion for efficient LLM usage',
    type: 'reference',
    tags: ['Web', 'Content', 'Fetching'],
    rating: 4.5,
    extraTags: ['+1 more']
  },
  {
    id: 'browser-use',
    name: 'browser-use',
    description: 'browser-use MCP server with dockerized playwright + chromium + vnc. supports stdio & resumable http.',
    type: 'community',
    tags: ['Browser', 'Automation', 'Docker'],
    rating: 4.3,
    extraTags: ['+1 more']
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    description: 'A MCP server to connect to Discord guilds through a bot and read and write messages in channels',
    type: 'community',
    tags: ['Discord', 'Bot', 'Communication'],
    rating: 4.2,
    extraTags: ['+1 more']
  }
];

// Tab categories
const categories = [
  { id: 'all', name: 'All Servers' },
  { id: 'reference', name: 'Reference Servers' },
  { id: 'third-party', name: 'Third-Party Servers' },
  { id: 'community', name: 'Community Servers' },
  { id: 'frameworks', name: 'Frameworks' },
  { id: 'resources', name: 'Resources' }
];

const MCP = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const filteredCards = React.useMemo(() => {
    if (activeCategory === 'all') return serverCards;
    if (activeCategory === 'frameworks') return serverCards.filter(card => card.type === 'framework');
    if (activeCategory === 'resources') return serverCards;
    return serverCards.filter(card => card.type === activeCategory);
  }, [activeCategory]);

  const getCardBadgeClass = (type: string) => {
    switch(type) {
      case 'framework':
        return "bg-gradient-to-r from-blue-400 to-indigo-500";
      case 'reference':
        return "bg-gradient-to-r from-blue-500 to-purple-400";
      case 'third-party':
        return "bg-gradient-to-r from-pink-400 to-purple-500";
      case 'community':
        return "bg-gradient-to-r from-blue-400 to-teal-400";
      default:
        return "bg-gradient-to-r from-gray-400 to-slate-500";
    }
  };
  
  return (
    <ChatLayout>
      {/* Changed from min-h-screen to flex-1, and added class to prevent overlap with sidebar */}
      <div className="flex-1 bg-[#111827] text-white p-6 md:p-8 overflow-auto w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">MCP Servers</h1>
            <p className="text-gray-400 max-w-3xl">
              Explore the Model Context Protocol (MCP) server ecosystem. Browse reference
              implementations, third-party integrations, community servers, and frameworks for building AI-
              powered applications.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search MCP servers..."
                className="w-full bg-[#1c2536] border border-gray-700 rounded-md py-2 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-[#1c2536] border border-gray-700 rounded-md px-4 py-2 flex items-center gap-2 text-sm">
                <span>Highest Rated</span>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="bg-[#1c2536] border border-gray-700 rounded-md px-4 py-2 flex items-center gap-2 text-sm">
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
            <div className="flex flex-wrap gap-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#1c2536] text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Server Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map(card => (
              <div 
                key={card.id} 
                className="bg-gradient-to-b from-[#1a2235] to-[#131c2e] rounded-lg overflow-hidden border border-gray-800 relative"
              >
                {/* Type badge */}
                <div className={`absolute right-0 top-0 rounded-bl-md rounded-tr-md text-xs font-medium px-2 py-1 text-white ${getCardBadgeClass(card.type)}`}>
                  {card.type}
                </div>
                
                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3">{card.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-12 line-clamp-2">{card.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag, index) => (
                      <span 
                        key={`${card.id}-tag-${index}`}
                        className="bg-[#252e3f] text-gray-300 text-xs px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {card.extraTags?.map((tag, index) => (
                      <span 
                        key={`${card.id}-extratag-${index}`}
                        className="bg-[#252e3f] text-gray-400 text-xs px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Rating and Details */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-1 text-sm font-bold text-amber-400">{card.rating.toFixed(1)}</span>
                    </div>
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
                      Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MCP;
