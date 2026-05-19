<template>
  <main class="blog-container">
    <header class="blog-header">
      <h1 class="gradient-text">Modern Tech Blog</h1>
      <p>Exploring the bleeding edge of web development.</p>
    </header>

    <div v-if="loading" class="loader">Loading posts...</div>

    <div v-else class="post-grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <div class="card-image-wrapper">
          <img
            :src="post.image_url"
            @error="$event.target.src = 'https://picsum.photos/600/400'"
            :alt="post.title"
            class="card-image"
          />
        </div>
        <div class="card-content">
          <span class="post-date">{{ post.created_at }}</span>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <router-link :to="`/post/${post.id}`" class="read-more"
            >Read Article
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("http://rayyan-blog-api.infinityfreeapp.com/api/api.php");
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  color: #f8fafc;
  min-height: 100vh;
}
.blog-header {
  text-align: center;
  margin-bottom: 4rem;
}
.gradient-text {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(to right, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}
.blog-header p {
  color: #94a3b8;
  font-size: 1.2rem;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition:
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
}
.post-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(56, 189, 248, 0.3);
}

.card-image-wrapper {
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.post-card:hover .card-image {
  transform: scale(1.08);
}

.card-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.post-date {
  font-size: 0.875rem;
  color: #38bdf8;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.card-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.card-content p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
}
.read-more:hover {
  color: #38bdf8;
}
.loader {
  text-align: center;
  font-size: 1.5rem;
  color: #38bdf8;
}
</style>
