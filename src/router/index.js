import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList.vue'
import Article from '../components/Article.vue'
import UserInfo from '../components/UserInfo.vue'
import SliderBar from '../components/SliderBar.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            name: 'root',
            path: '/',
            components: {
                main: PostList
            }
        },
        {
            name: 'article-content',
            path: '/topic/:id&author=:name',
            components: {
                main: Article,
                slider: SliderBar
            }
        },
        {
            name: 'user_info',
            path: '/userinfo/:name',
            components: {
                main: UserInfo,
                slider: SliderBar
            }
        }
    ]
})