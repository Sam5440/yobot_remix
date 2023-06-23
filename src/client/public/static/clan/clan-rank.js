if (!Object.defineProperty) {
    alert('浏览器版本过低');
}
var vm = new Vue({
    el: '#app',
    data: {
        activeIndex: "6",
        clanRankUrl : "",
        iframeHeight : 800,
        server: "cn"
    },
    mounted() {
        var thisvue = this;
        axios.post("../api/", {
            action: 'get_data',
            csrf_token: csrf_token,
        }).then(function (res) {
            if (res.data.code == 0) {
                thisvue.server = res.data.groupData.game_server;
                thisvue.switchServer()
            } else {
                thisvue.$alert(res.data.message, '加载数据错误');
            }
        }).catch(function (error) {
            thisvue.$alert(error, '加载数据错误');
        });

        window.addEventListener("resize", () => {
            thisvue.iframeHeight = document.documentElement.clientHeight - 65;
        });

        thisvue.iframeHeight = document.documentElement.clientHeight - 65;
    },

    methods: {
        handleSelect(key, keyPath) {
            switch (key) {
                case '1':
                    window.location = '../';
                    break;
                case '2':
                    window.location = '../subscribers/';
                    break;
                case '3':
                    window.location = '../progress/';
                    break;
                case '4':
                    window.location = '../statistics/';
                    break;
                case '5':
                    window.location = `../my/`;
                    break;
                case '6':
                    window.location = `../clan-rank/`;
                    break;
            }
        },
        switchServer() {
            if(this.server == "cn") {
                this.clanRankUrl = "https://kyouka.kengxxiao.com/rank/clan";
            }else if(this.server == "tw"){
                this.clanRankUrl = "https://rank.layvtwt.top/";
            }
        },
    },
    delimiters: ['[[', ']]'],
})