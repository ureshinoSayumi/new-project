<template>
  <nav aria-label="Page navigation example">
    {{ data }}
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages" :key="page + 'page'">
        <a class="page-link" href="#"
          @click.prevent="emitPages(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="emitPages(pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagesView',
  props: ['pages'],
  emits: ['emit-pages'],
  data() {
    return {
      data: '元建',
    };
  },
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
