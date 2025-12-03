// src/utils/helpers.js
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('id-ID', options);
}

export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Baru saja';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}

export function getDifficultyColor(difficulty) {
  const colors = {
    mudah: 'bg-green-100 text-green-800',
    sedang: 'bg-yellow-100 text-yellow-800',
    sulit: 'bg-red-100 text-red-800',
  };
  return colors[difficulty?.toLowerCase()] || 'bg-gray-100 text-gray-800';
}

export function getCategoryEmoji(category) {
  const emojis = {
    makanan: '🍲',
    minuman: '🥤',
  };
  return emojis[category?.toLowerCase()] || '🍽️';
}

export function isValidRating(rating) {
  return typeof rating === 'number' && rating >= 1 && rating <= 5;
}

export function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '⭐'.repeat(fullStars) + 
         (hasHalfStar ? '✨' : '') + 
         '☆'.repeat(emptyStars);
}

export function truncateText(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatCurrency(priceInput) {
  if (!priceInput) return { value: '', unit: '' };

  const numericPrice = typeof priceInput === 'string' 
    ? parseInt(priceInput.replace(/\D/g, '')) 
    : priceInput;
  
  if (isNaN(numericPrice)) return { value: priceInput.toString(), unit: '' };

  if (numericPrice >= 1000000000000) {
    return { 
      value: (numericPrice / 1000000000000).toFixed(1).replace(/\.0$/, ''), 
      unit: 'Triliun'
    };
  }
  if (numericPrice >= 1000000000) {
    return { 
      value: (numericPrice / 1000000000).toFixed(1).replace(/\.0$/, ''), 
      unit: 'Miliar'
    };
  }
  if (numericPrice >= 1000000) {
    return { 
      value: (numericPrice / 1000000).toFixed(0), 
      unit: 'Juta'
    };
  }
  
  return { value: numericPrice.toLocaleString('id-ID'), unit: '' };
}