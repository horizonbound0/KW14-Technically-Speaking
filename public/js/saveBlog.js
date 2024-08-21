const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const blog = document.querySelector('#blog-body').value.trim();
  
    if (title && blog) {
      const response = await fetch('/api/blogs/submit', {
        method: 'POST',
        body: JSON.stringify({ title, blog }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to save blog');
      }
    }
  };
    
    document
      .querySelector('.blog-form')
      .addEventListener('submit', blogFormHandler);
    