<script>
export default {
  name: "group-box",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  render(h) {
    function createNode(item) {
      return <div>{item.name}</div>;
    }

    function createNodes(datas) {
      return datas.map(item => {
        if (item.items && item.items.length) {
          return createNodes(item.items);
        }
        return item.items.map(createNode);
      });
    }
    let nodes = createNodes(this.items);
    console.log(nodes);

    return <div>{nodes}</div>;
  }
};
</script>