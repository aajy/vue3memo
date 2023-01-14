<template>
  <div class="memo">
    <div class="act">
      <input type="text" v-model="state.newMemo"/>
      <button class="btn btn-primary" @click="add(state.newMemo)">+ 추가</button>
    </div>
    <ul>
      <li v-for="d in state.data" :key="d.id">
        {{ d.content }}
        <div>
          <button class="btn btn-secondary" @click="edit(d.id)">수정</button>
          <button class="btn btn-danger" @click="remove(d.id)">삭제</button>
        </div>
      </li>
    </ul>
  </div></template>

<script>
import{ reactive } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const state = reactive({
      data: [],
      newMemo: ''
    })
    const add = (memo)=> {
      if (!memo) {
        alert('내용을 입력해주세요.');
      } else {
        axios.post('/api/memos', {content: memo} ).then((res) => {
          console.log('postresponse', res)
          if (res) {
            state.data = res.data
            state.newMemo = ''
          } else {
            alert('메모 추가가 실패하였습니다.')
          }
        })
      }
    }
    const edit = (id)=> {
      const content = prompt("내용을 입력해주세요", state.data.find(d => d.id === id).content)
      if (content) {
        axios.put('/api/memos/' + id, { content }).then((res) => {
          if (res) {
            state.data = res.data
          } else {
            alert('메모 수정이 실패하였습니다.')
          }
        })
      } else {
        console.log('수정 취소')
      }
    }
    const remove = (id)=> {
      const isRemoveContent = confirm('"' + state.data.find(d => d.id === id).content + '" 메모를 삭제하시겠습니까?')
      if (isRemoveContent) {
        axios.delete('/api/memos/' + id).then((res) => {
          if (res) {
            state.data = res.data
          } else {
            alert('메모 삭제가 실패하였습니다.')
          }
        })
      } else {
        console.log('삭제 취소')
      }
    }

    axios.get('/api/memos').then((res) => {
      console.log('getresponse', res)
      state.data = res.data
    })
    return { state, add, edit, remove }
  }
}
</script>
<style scoped lang="scss">
.memo {
  .act {
    padding:10px 10px 5px 5px;
    display: flex;
    input {
      display: block;
      flex: 6 1 0;
    }
    button {
      display: block;
      flex: 1 1 0;
      overflow-wrap: keep-all;
    }
  }
  ul {
    list-style: none;
    padding: 15px 0;
    margin: 0;
    li {
      padding: 15px;
      margin: 10px 0px;
      border: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      button.btn-secondary {
        margin-right: 3px;
      }
    }
  }
}
</style>
