<template>
  <div class="container">
    <h3>Multiselect with type ahead</h3>
    <div class="multiselect" id="app">
      <div class="selected-hold" :class="{ focus: hasFocus }"
        @click.self="$refs.search.focus()"
        @keydown.left="traverseSelected('left')"
        @keydown.right="traverseSelected('right')"
        @keyup.delete="traverseSelectedDelete">
        <div class="selected-item"
          :class="{ active: activeHorizontal === index }"
          v-for="(itm, index) in selectedList"
          :key="index">
          <span class="item-label">{{ itm }}</span>
          <button type="button" class="close" @click="removeSelected(index)" tabindex="-1">
            <span>&times;</span>
          </button>
        </div>
        <label for="text"></label>
        <input name="text" type="text" class="item-search" ref="search"
          :style="{ width: searchTermWidth }"
          v-model.trim="searchTerm"
          @keydown.down="traverseList('next')"
          @keydown.up="traverseList('prev')"
          @keydown.delete="backspaceDelete"
          @keyup.enter="addActive"
          @keyup="lastTerm = searchTerm"
          @focus="showSuggestPanel = true; hasFocus = true; activeHorizontal = -1"
          @blur="showSuggestPanel = false; hasFocus = false">
        <div ref="tester" class="text-tester">{{ searchTerm }}</div>
        <div class="suggest-panel" v-show="showSuggestPanel" ref="panel">
          <div class="suggest-item"
            :class="{ active: activeVertical === index, disabled:
              selectedList.includes(row.value || row) }"
            v-for="(row, index) in filteredSuggest"
            :key="index"
            @mousedown.prevent="addSelected(row.value || row)"
            @mouseover="activeVertical = index" v-html="hightlightWord(row)"
            @focus="addSelected(row.value || row)"
            @blur="activeVertical = index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: ['pages'],
  emits: ['emit-pages'],
  data() {
    return {
      searchTerm: '',
      searchTermWidth: '',
      lastTerm: '',
      suggestList: ['678', 'ABC', 'TEST', 'SLT', 'TOP', 'NED', 'XYZ'],
      selectedList: [],
      activeVertical: 0,
      activeHorizontal: -1,
      showSuggestPanel: false,
      hasFocus: false,
    };
  },
  methods: {
    addSelected(val) {
      if (this.selectedList.includes(val)) return;
      console.log(val);
      this.selectedList.push(val);
      this.searchTerm = '';
      this.activeHorizontal = -1;
    },
    addActive() {
      const value = this.filteredSuggest[this.activeVertical];
      if (value && this.showSuggestPanel) this.addSelected(value.value || value);
    },
    removeSelected(index) {
      this.selectedList.splice(index, 1);
    },
    traverseList(direction) {
      if (direction === 'next' && !this.showSuggestPanel) {
        this.activeVertical = -1;
      }
      const lastIndex = this.filteredSuggest.length - 1;
      const newIndex = direction === 'next' ? this.activeVertical + 1 : this.activeVertical - 1;
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeVertical = newIndex;
      }
      this.scrollToView();
    },
    traverseSelected(direction) {
      const lastIndex = this.selectedList.length - 1;
      if (this.activeHorizontal === -1) {
        this.activeHorizontal = lastIndex + 1;
      }
      const newIndex = direction === 'left' ? this.activeHorizontal - 1 : this.activeHorizontal + 1;
      if (newIndex === this.selectedList.length) {
        this.activeHorizontal = -1;
        return;
      }
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeHorizontal = newIndex;
      }
    },
    traverseSelectedDelete() {
      if (this.activeHorizontal === -1) return;
      this.removeSelected(this.activeHorizontal);
    },
    backspaceDelete() {
      if (this.activeHorizontal !== -1) return;
      if (!this.selectedList.length) return;
      if (this.lastTerm) return;

      const lastIndex = this.selectedList.length - 1;
      if (lastIndex !== -1) this.removeSelected(lastIndex);
    },
    scrollToView() {
      if (!this.showSuggestPanel) return;

      this.$nextTick().then(() => {
        const container = this.$refs.panel;
        const item = this.$el.querySelector('.suggest-item.active');
        const sy1 = container.scrollTop;
        const sy2 = container.offsetHeight + sy1;
        const ty1 = item.offsetTop;
        const th = item.offsetHeight;
        const ty2 = th + ty1;
        if (ty1 <= sy2 && sy2 < ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty1 - sy2)) + th;
        } else if (ty1 < sy1 && sy1 <= ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty2 - sy1)) - th;
        }
      });
    },
    calcTextWidth() {
      const textWidth = this.$refs.tester.clientWidth;
      const finalWidth = textWidth ? textWidth + 10 : 50;
      this.searchTermWidth = `${finalWidth}px`;
    },
    hightlightWord(val) {
      if (val.label) return val.label;
      if (!this.searchTerm) return val;
      console.log(val, 'hight');
      const termRegex = RegExp(`(${this.sanitizedTerm})`, 'i');
      return val.replace(termRegex, (m, t) => `<span class="highlight">${t}</span>`);
    },
  },
  mounted() {
    console.log(this.suggestList);
  },
  computed: {
    sanitizedTerm() {
      return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    filteredSuggest() {
      if (!this.searchTerm) return this.suggestList;
      const ex = RegExp(this.sanitizedTerm, 'i');
      const filtered = this.suggestList.filter((ele) => ex.test(ele));
      const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`;
      return filtered.length ? filtered : [{ label, value: this.searchTerm }];
    },
  },
  watch: {
    value(newList) {
      this.selectedList = newList;
    },
    list(newList) {
      this.suggestList = newList;
    },
    filteredSuggest() {
      this.activeVertical = 0;
    },
    searchTerm() {
      this.$nextTick().then(() => this.calcTextWidth());
    },
    selectedList(newList) {
      this.$emit('input', newList);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.multiselect {
  $bg-color: #fff;
  $bd-color: #ccc;
  $suggest-height: 300px;
  $border-radius: 4px;
  $item-space: .3em;
  $suggest-zindex: 10;
  position: relative;
  .selected-hold {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: $item-space 0 0 $item-space;
    border-radius: $border-radius;
    border: 1px solid $bd-color;
    background-color: $bg-color;
    &.focus {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }
  }
  .selected-item {
    margin: 0 $item-space $item-space 0;
    padding: .1em .5em;
    border-radius: $border-radius;
    border: 1px solid darken($bd-color, 5%);
    background-color: darken($bg-color, 10%);
    .item-label {
      margin-right: .5em;
    }
    .close {
      outline: none;
    }
    &.active {
      border-color: darken(#66afe9, 20%);
    }
  }
  .item-search {
    width: 50px;
    margin: 0 .5em .5em 0;
    border: none;
    outline: none;
  }
  .suggest-panel {
    position: absolute;
    top: 100%;
    left: 0px;
    z-index: $suggest-zindex;
    width: 100%;
    max-height: $suggest-height;
    overflow: auto;
    border: 1px solid $bd-color;
    background-color: $bg-color;
    .suggest-item {
      padding: .4em .8em;
      &.active {
        background-color: darken($bg-color, 10%)
      }
      &.disabled {
        color: lighten(invert($bg-color), 60%);
        text-decoration: line-through;
      }
      .highlight {
        background-color: #ff0;
      }
    }
  }
  .text-tester {
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    white-space: nowrap;
  }
}
</style>
