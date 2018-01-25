"use strict";

const AV = require("leanengine");
const Router = require("koa-router");
const router = new Router({ prefix: "/organization" });

const Organization = AV.Object.extend("Organization");

// 查询获取数据
router.get("/", async function(ctx) {
  const query = new AV.Query(Organization);
  query.descending("id");
  try {
    ctx.state.organization = await query.find();
  } catch (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      //   ctx.state.todos = [];
    } else {
      throw err;
    }
  }
  await ctx.render("index.ejs");
});

// 新修改组织信息
router.post("/", async function(ctx) {
  const content = ctx.request.body;
  console.log(content);
  ctx.body = content;
  var organization = AV.Object.createWithoutData("Organization", content.id);
  organization.set("jiguan", parseInt(content["jiguan"]));
  organization.set("guoyouqiye", parseInt(content["guoyouqiye"]));
  organization.set("feigongjingji", parseInt(content["feigongjingji"]));
  organization.set("shehuizuzhi", parseInt(content["shehuizuzhi"]));
  organization.set("xuexiao", parseInt(content["xuexiao"]));
  organization.set("yiyuan", parseInt(content["yiyuan"]));
  await organization.save();
  ctx.redirect("/organization");
});

module.exports = router;
