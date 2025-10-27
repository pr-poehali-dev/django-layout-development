const API_URLS = {
  auth: 'https://functions.poehali.dev/83abe3b3-8c2b-4e55-8a3d-5eccd2d5f356',
  content: 'https://functions.poehali.dev/61658db6-95ff-425a-9741-d83782aae247',
  leads: 'https://functions.poehali.dev/ec40ed33-a116-4026-8c8a-a3974e78b2fa',
  modules: 'https://functions.poehali.dev/c068a827-a908-48e9-8afa-9996a1421fe0',
  gallery: 'https://functions.poehali.dev/42a4a1c9-5ce7-4d3d-8760-f3ef702ed550'
};

export interface SiteContent {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

export interface CourseModule {
  id: number;
  course_type: string;
  title: string;
  description: string;
  result: string;
  image_url?: string;
  order_num: number;
}

export interface Lead {
  id: number;
  name?: string;
  phone: string;
  status: string;
  source: string;
  course?: string;
  message_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  image_url?: string;
  order_num: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order_num: number;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
  order_num: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  sort_order: number;
}

export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      return response.json();
    },
    register: async (username: string, password: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, password })
      });
      return response.json();
    }
  },
  
  content: {
    getAll: async (): Promise<SiteContent[]> => {
      const response = await fetch(API_URLS.content);
      return response.json();
    },
    getByKey: async (key: string): Promise<SiteContent> => {
      const response = await fetch(`${API_URLS.content}?key=${key}`);
      return response.json();
    },
    update: async (key: string, value: string, token?: string) => {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['X-Auth-Token'] = token;
      
      const response = await fetch(API_URLS.content, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ key, value })
      });
      return response.json();
    }
  },
  
  leads: {
    getAll: async (token: string): Promise<Lead[]> => {
      const response = await fetch(API_URLS.leads, {
        headers: { 'X-Auth-Token': token }
      });
      return response.json();
    },
    create: async (data: { 
      name?: string; 
      phone: string; 
      source: string; 
      course?: string;
      utm?: any;
      ym_client_id?: string;
    }) => {
      const response = await fetch(API_URLS.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    updateStatus: async (id: number, status: string, token: string) => {
      const response = await fetch(API_URLS.leads, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ id, status })
      });
      return response.json();
    }
  },
  
  modules: {
    getAll: async (): Promise<CourseModule[]> => {
      const response = await fetch(API_URLS.modules);
      return response.json();
    },
    getByCourse: async (courseType: string): Promise<CourseModule[]> => {
      const response = await fetch(`${API_URLS.modules}?course_type=${courseType}`);
      return response.json();
    },
    create: async (module: Partial<CourseModule>, token: string) => {
      const response = await fetch(API_URLS.modules, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify(module)
      });
      return response.json();
    },
    update: async (module: CourseModule, token: string) => {
      const response = await fetch(API_URLS.modules, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify(module)
      });
      return response.json();
    },
    delete: async (id: number, token: string) => {
      const response = await fetch(API_URLS.modules, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ id })
      });
      return response.json();
    }
  },
  
  gallery: {
    getImages: async (): Promise<GalleryImage[]> => {
      const response = await fetch(`${API_URLS.gallery}?resource=gallery`);
      return response.json();
    },
    getReviews: async (): Promise<Review[]> => {
      const response = await fetch(`${API_URLS.gallery}?resource=reviews`);
      return response.json();
    },
    getFAQ: async (): Promise<FAQ[]> => {
      const response = await fetch(`${API_URLS.gallery}?resource=faq`);
      return response.json();
    },
    createFAQ: async (faq: Partial<FAQ>, token: string) => {
      const response = await fetch(API_URLS.gallery, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ resource: 'faq', ...faq })
      });
      return response.json();
    },
    updateFAQ: async (faq: FAQ, token: string) => {
      const response = await fetch(API_URLS.gallery, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ resource: 'faq', ...faq })
      });
      return response.json();
    },
    deleteFAQ: async (id: number, token: string) => {
      const response = await fetch(API_URLS.gallery, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ resource: 'faq', id })
      });
      return response.json();
    },
    getBlog: async (): Promise<BlogPost[]> => {
      const response = await fetch(`${API_URLS.gallery}?resource=blog`);
      return response.json();
    },
    getTeam: async (): Promise<TeamMember[]> => {
      const response = await fetch(`${API_URLS.gallery}?resource=team`);
      return response.json();
    },
    createTeamMember: async (member: Partial<TeamMember>, token: string) => {
      const response = await fetch(`${API_URLS.gallery}?resource=team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify(member)
      });
      return response.json();
    },
    updateTeamMember: async (member: TeamMember, token: string) => {
      const response = await fetch(`${API_URLS.gallery}?resource=team&id=${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify(member)
      });
      return response.json();
    },
    deleteTeamMember: async (id: number, token: string) => {
      const response = await fetch(`${API_URLS.gallery}?resource=team&id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        }
      });
      return response.json();
    }
  }
};