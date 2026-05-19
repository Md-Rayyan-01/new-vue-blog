<template>
  <main class="form-container">
    <div class="glass-panel">
      <h1 class="gradient-text">Publish New Post</h1>

      <form @submit.prevent="submitPost" class="modern-form">
        <div class="input-group">
          <label for="title">Post Title</label>
          <input
            type="text"
            id="title"
            v-model="post.title"
            required
            placeholder="Enter a catchy title..."
          />
        </div>

        <div class="input-group">
          <label for="image_url">Cover Image URL</label>
          <input
            type="url"
            id="image_url"
            v-model="post.image_url"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="input-group">
          <label for="excerpt">Short Excerpt</label>
          <textarea
            id="excerpt"
            v-model="post.excerpt"
            required
            rows="2"
            placeholder="A brief summary..."
          ></textarea>
        </div>

        <div class="input-group">
          <label for="content">Full Content</label>
          <textarea
            id="content"
            v-model="post.content"
            required
            rows="8"
            placeholder="Write your masterpiece here..."
          ></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? "Publishing..." : "Publish Post" }}
        </button>

        <p
          v-if="message"
          :class="['status-msg', isError ? 'error' : 'success']"
        >
          {{ message }}
        </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";

const post = reactive({ title: "", excerpt: "", content: "", image_url: "" });
const isSubmitting = ref(false);
const message = ref("");
const isError = ref(false);

const submitPost = async () => {
  isSubmitting.value = true;
  message.value = "";

  try {
    // save
    const response = await fetch("https://rayyan-blog-api.infinityfreeapp.com/api/create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    const data = await response.json();

    if (data.status === "success") {
      message.value = "Success! Your post is live.";
      isError.value = false;
      post.title = "";
      post.excerpt = "";
      post.content = "";
      post.image_url = "";
    } else {
      throw new Error(data.message || "Something went wrong.");
    }
  } catch (error) {
    message.value = error.message;
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #0f172a;
  font-family: "Inter", sans-serif;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 700px;
  backdrop-filter: blur(16px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.gradient-text {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  color: transparent;
}

.modern-form {
  display: grid;
  gap: 1.5rem;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

input,
textarea {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #f8fafc;
  font-size: 1rem;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

.submit-btn {
  background: linear-gradient(to right, #38bdf8, #818cf8);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s ease;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-msg {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 1rem;
}
.success {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
}
.error {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}
</style>
