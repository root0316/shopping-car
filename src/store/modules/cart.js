import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    addById (state, id) {
      const targetItem = state.list.find(item => item.id === id)
      if (targetItem) { // 找到元素才修改，安全不报错
        targetItem.count++
      }
    },
    subtractById (state, id) {
      // state.list.find(item => item.id === id).count--
      const targetItem = state.list.find(item => item.id === id)
      if (targetItem) { // 找到元素才修改，安全不报错
        targetItem.count--
      }
    }
  },
  actions: {
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', res.data)
    },
    async addCount (context, id) {
      const newCount = context.state.list.find(item => item.id === id).count + 1
      await axios.patch(`http://localhost:3000/cart/${id}`, { count: newCount })
      context.commit('addById', id)
    },
    async subtractCount (context, id) {
      const newCount = context.state.list.find(item => item.id === id).count - 1
      await axios.patch(`http://localhost:3000/cart/${id}`, { count: newCount })
      context.commit('subtractById', id)
    }

  },
  getters: {
    getAllPrice (state) {
      state.list.reduce((sum, cur) => sum + cur.count * cur.price, 0)
    },
    getAllNum (state) {
      state.list.reduce((sum, cur) => sum + cur.count, 0)
    }
  }
}
