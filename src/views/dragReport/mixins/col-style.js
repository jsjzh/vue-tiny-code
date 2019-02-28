export default {
  methods: {
    previewColStyle({ width, height }, baseWidth = 100, baseHeight = 3, layoutRow = 24) {
      return {
        width: `${(baseWidth * width) / layoutRow}%`,
        height: `${height / baseHeight}px`
      }
    }
  }
}
