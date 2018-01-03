<template>
  <div :newsid="id">
    <h3>精彩评论（{{count}}</h3>
    <textarea placeholder="点赞都是套路，评论才叫真诚" maxlength="100" v-model="msg"></textarea>
    <mt-button type="danger" size="small" @click="postMsg">回复</mt-button>
  <!-- 评论列表区域 -->
  <div class="cmt-list">
    <div class="cmt-item" v-for="(item, i) in cmtlist" :key="i">
      <div class="cmt-item-title">第{{ i+1 }}楼&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
      <div class="cmt-item-body">{{ item.content }}</div>
    </div>
  </div>
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
// 按需从 MintUI 中，导出需要的 弹框组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      page: 1, 
      cmtlist: [], 
      msg: "",
      count:0 
    };
  },
  created() {
    this.getCommentByPage();
  },
  methods: {
    async getCommentByPage() {
      // 根据页数来获取评论的数据
      const { data } = await axios.get(
        "/api/getcomments/" + this.newsid + "?pageindex=" + this.page
      );
      if (data.status === 0)
        return (this.cmtlist = this.cmtlist.concat(data.message));
    },
    loadMore() {
      // 点击按钮，加载更多的评论
      this.page++;
      this.getCommentByPage();
    },
    async postMsg() {
      // 点击回复：
      if (this.msg.trim().length <= 0) return Toast("请填写评论内容！");
      // 回复的逻辑：
      const { data } = await axios.post(
        "/api/postcomment/" + this.newsid,
        {
          content: this.msg.trim()
        }
      );
      if (data.status === 0) {
        // 刷新评论列表
        this.cmtlist.unshift({
          user_name: "匿名用户",
          add_time: new Date(),
          content: this.msg.trim()
        });
        this.msg = "";
      }
    }
  },
  props: ["newsid"] 
};
</script>

<style lang="scss" scoped>
//局部组件样式
textarea {
  font-size: 14px;
  margin: 0;
}
.cmt-list {
  margin-top: 4px;
  .cmt-item {
    line-height: 30px;
    .cmt-item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .cmt-item-body {
      font-size: 13px;
      text-indent: 2em;
    }
  }
}
</style>
