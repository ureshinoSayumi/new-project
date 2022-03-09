<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="./index.html">Navbar</a>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end"
      id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link me-4" to="/">Home</router-link>
        <router-link class="nav-item nav-link me-4" to="/login">Login</router-link>
        <router-link class="nav-item nav-link me-4" to="/products">Products</router-link>
        <router-link class="nav-item nav-link me-4" to="/cart">Cart</router-link>
        <!-- <router-link class="nav-item nav-link me-4" to="about-products">
          About-Products</router-link> -->
      </div>
    </div>
  </nav>
</template>
