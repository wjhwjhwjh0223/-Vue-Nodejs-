<template>
  <dv-full-screen-container class="dv-full-screen-container">
    <!-- 头部 -->
    <header>
      <p class="title">xxx系统的数据中心</p>
      <dv-decoration-5 class="dv-decoration-5" />
    </header>
    <!-- 主要内容区 -->
    <main>
      <!-- 左边框 -->
      <dv-border-box-3 class="dv-border-box-3">dv-border-box-3</dv-border-box-3>
      <div class="right">
        <dv-border-box-6>
          <dv-water-level-pond
            :config="config"
            style="width: 150px; height: 200px"
          />
        </dv-border-box-6>
        <dv-border-box-4>
          <dv-active-ring-chart
            :config="config1"
            style="width: 300px; height: 300px"
          />
        </dv-border-box-4>
      </div>
    </main>
  </dv-full-screen-container>
</template>

<script>
export default {
  data() {
    return {
      // 水位图的config
      config: {
        data: [55],
        shape: "round",
      },
      // 环图的配置
      config1: {
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dv-full-screen-container {
  // 设置背景图
  background-image: url("./bg.png");
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      color: #fff;
      font-size: 25px;
    }
    .dv-decoration-5 {
      width: 500px;
      height: 40px;
    }
  }
  main {
    flex: 1;
    display: flex;
    .dv-border-box-3 {
      width: 400px;
      height: 100%;
    }
    .right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
