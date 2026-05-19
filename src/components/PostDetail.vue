<template>
  <main class="post-detail-container">
    <div v-if="loading" class="loader">Loading article...</div>
    
    <article v-else-if="post" class="full-post">
      <header class="post-header">
        <router-link to="/" class="back-btn">&larr; Back to Feed</router-link>
        <span class="post-date">{{ post.created_at }}</span>
        <h1 class="gradient-text">{{ post.title }}</h1>
      </header>

      <div class="hero-image-wrapper">
        <img :src="post.image_url" @error="$event.target.src='https://picsum.photos/1200/600'" :alt="post.title" class="hero-image" />
      </div>

      <div class="post-body">
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="content" style="white-space: pre-wrap;">{{ post.content }}</div>
      </div>
    </article>

    <div v-else class="error">Post not found.</div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(`https://rayyan-blog-api.infinityfreeapp.com/api/get_post.php?id=${route.params.id}`);
    const data = await response.json();
    post.value = data;
  } catch (error) {
    console.error('Error fetching post:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.post-detail-container {
     max-width: 900px; margin: 0 auto; padding: 4rem 2rem; color: #f8fafc;
    }
    .back-btn {
    display: inline-block; color: #38bdf8; text-decoration: none; font-weight: 600; margin-bottom: 2rem;
    }
    .back-btn:hover { 
    text-decoration: underline;
    }
    .post-date {
    display: block; color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem; 
    }
    .gradient-text {
    font-size: 3.5rem; font-weight: 800; background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; color: transparent; margin-bottom: 2rem; line-height: 1.2; 
    }
    .hero-image-wrapper {
    width: 100%; aspect-ratio: 16/9; border-radius: 20px; overflow: hidden; margin-bottom: 3rem; border: 1px solid rgba(255, 255, 255, 0.1); 
    }
    .hero-image { 
    width: 100%; height: 100%; object-fit: cover; 
    }
    .post-body { 
    font-size: 1.15rem; line-height: 1.8; color: #cbd5e1; 
    }
    .excerpt { 
    font-size: 1.4rem; font-weight: 500; color: #f8fafc; margin-bottom: 2rem; border-left: 4px solid #38bdf8; padding-left: 1.5rem; 
    }
    .loader, .error { 
    text-align: center; font-size: 1.5rem; margin-top: 5rem; 
    }
</style>