<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo">Blogger</div>
        <div class="nav-links">
          <router-link to="/">Blog Feed</router-link>
          <router-link to="/create" class="nav-btn">Write a Post</router-link>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #0f172a;
  font-family: "Inter", sans-serif;
}

.navbar {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #f8fafc;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #38bdf8;
}

.nav-btn {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8 !important;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.nav-btn:hover {
  background: rgba(56, 189, 248, 0.2);
}
</style>
