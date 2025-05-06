// // src/app/articles/new/page.tsx
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function NewArticlePage() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       const response = await fetch('/api/articles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, content }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create article');
//       }

//       router.push('/articles');
//     }
//         catch (err :unknown) {
//             // console.log(err.message)
//             if (err instanceof Error) {
//                 console.error(err.message);
//                 setError('An error occurred. Please try again.');
//               } else {
//                 console.error('Unexpected error:', err);
//                 setError('An unexpected error occurred.');
//               }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//             Content
//           </label>
//           <textarea
//             id="content"
//             rows={10}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Creating...' : 'Create Article'}
//           </button>
//           <button
//             type="button"
//             onClick={() => router.push('/articles')}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// src/app/articles/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      router.push('/articles');
    } catch (err) {
      setError('Failed to create article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Article'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/articles')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}