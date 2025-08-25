/**
 * 游戏网站主JavaScript文件
 * 包含所有页面交互功能
 */

// ==================== 主视觉区切换 ====================

/**
 * 切换主视觉区内容
 * @param {string} gameId - 游戏ID
 * @param {string} title - 游戏标题
 * @param {string} imageUrl - 游戏图片URL
 * @param {string} avatarUrl - 新头像路径
 * @param {string} studioName - 新工作室名称
 * @param {string} viewCount - 新浏览量
 */



function switchMainContent(gameId, title, imageUrl, creatorAvatar, studioName, viewCount, description) {

    document.getElementById('games-hero-image').src = imageUrl;// 图片
    document.getElementById('games-caption').textContent = title;//游戏名
    document.getElementById('creator-avatar').src = creatorAvatar;;//开发者头像
    document.getElementById('studio-name').textContent = studioName;//开发者名称
    document.getElementById('view-count').textContent = viewCount;//流量信息 
    document.getElementById('game-description1').textContent = description;//游戏描述内容 

}

// ==================== 页面切换功能 ====================

/**
 * 显示指定页面
 * @param {string} pageId - 要显示的页面ID
 */
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示请求的页面
    document.getElementById(pageId).classList.add('active');
    
    // 更新导航激活状态
    updateNavActiveState(pageId);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 关闭移动端菜单
    document.getElementById('nav-links').classList.remove('active');


}

/**
 * 更新导航栏激活状态
 * @param {string} pageId - 当前活动页面ID
 */
function updateNavActiveState(pageId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPageId = link.getAttribute('onclick').match(/showPage\('(.*?)'\)/)[1];
        if (linkPageId === pageId) {
            link.classList.add('active');
        }
    });
}

// ==================== 游戏详情系统 ====================

/**
 * 显示游戏详情模态框
 * @param {string} gameId - 游戏ID
 */
function showGameDetail(gameId) {
    // 加载游戏数据
    loadGameData(gameId);
    
    // 显示模态框
    const modal = document.getElementById('game-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * 关闭游戏详情模态框
 */
function closeGameModal() {
    const modal = document.getElementById('game-modal');
    modal.classList.remove('active');
    
    // 延迟恢复滚动以完成渐隐动画
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 300);
}

/**
 * 加载游戏数据
 * @param {string} gameId - 游戏ID
 */
function loadGameData(gameId) {
    // 模拟游戏数据
    const games = {
        'space-odyssey': {
            title: '太空漫游',
            description: '《太空漫游》是一款令人兴奋的太空探险游戏。在游戏中，你将扮演一名勇敢的宇航员，驾驶飞船穿越未知的星系。你的任务是收集散落在宇宙中的能量晶体，同时躲避危险的陨石和小行星。',
            date: '2023-06-15',
            downloads: '12,548',
            rating: '4.8/5',
            type: '休闲/探险',
            features: [
                '5个独特的星系，超过50个关卡',
                '12种不同类型的飞船可供解锁',
                '丰富的成就系统和每日任务',
                '支持多人合作模式',
                '精美的太空视觉效果和音效'
            ],
            poster: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'jungle-jump': {
            title: '丛林跳跃',
            description: '在茂密的热带雨林中扮演一只敏捷的猴子，通过跳跃藤蔓收集香蕉，避开危险动物和陷阱。游戏具有精美的丛林场景和流畅的跳跃体验。',
            date: '2023-05-20',
            downloads: '9,327',
            rating: '4.6/5',
            type: '动作/冒险',
            features: [
                '8个独特的丛林场景',
                '20种不同的障碍物和陷阱',
                '角色升级系统',
                '全球排行榜',
                '每日挑战任务'
            ],
            poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'puzzle-master': {
            title: '解谜大师',
            description: '挑战你的逻辑思维能力，解决数百个精心设计的谜题关卡。从简单到复杂的谜题设计，适合各个年龄段的玩家。',
            date: '2023-07-10',
            downloads: '15,721',
            rating: '4.9/5',
            type: '益智/解谜',
            features: [
                '300多个精心设计的谜题关卡',
                '10种不同类型的谜题机制',
                '每日挑战和特别活动',
                '提示系统帮助解决难题',
                '简洁美观的界面设计'
            ],
            poster: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    };

    
    const game = games[gameId] || games['space-odyssey'];
    
    // 更新模态框内容
    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-description').textContent = game.description;
    document.getElementById('game-date').textContent = game.date;
    document.getElementById('game-downloads').textContent = game.downloads;
    document.getElementById('game-rating').textContent = game.rating;
    document.getElementById('game-type').textContent = game.type;
    document.getElementById('game-poster-image').style.backgroundImage = `url('${game.poster}')`;
    
    // 更新游戏特性
    const featuresList = document.getElementById('game-features');
    featuresList.innerHTML = '';
    game.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

// ==================== 移动端菜单 ====================

document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// ==================== 表单处理 ====================

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const contactType = document.getElementById('contact-type').value;
    const message = document.getElementById('message').value;
    
    // 显示发送中状态
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    
    // 模拟邮件发送
    setTimeout(() => {
        // 显示成功消息
        const formMessage = document.getElementById('form-message');
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '消息已成功发送！我们会尽快回复您。';
        
        // 重置表单
        this.reset();
        
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.innerHTML = '发送消息';
        
        // 在实际项目中，这里应将表单数据发送到服务器
        console.log('表单提交:', { name, email, subject, contactType, message });
    }, 1500);
});

// ==================== 模态框关闭 ====================

window.addEventListener('click', function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        closeGameModal();
    }
});

// ==================== 游戏筛选功能 ====================

/**
 * 过滤显示游戏列表
 * @param {string} category - 游戏分类
 * @param {string} searchTerm - 搜索关键词
 */
function filterGames(category, searchTerm = '') {
    const games = document.querySelectorAll('#games-list .game-card');
    
    games.forEach(game => {
        const gameCategory = game.getAttribute('data-category');
        const gameTitle = game.getAttribute('data-title').toLowerCase();
        
        const categoryMatch = category === 'all' || gameCategory === category;
        const searchMatch = gameTitle.includes(searchTerm);
        
        game.style.display = (categoryMatch && searchMatch) ? 'block' : 'none';
    });
}

// ==================== 首页滚动功能 ====================

let isScrolling = false;

function handleHomeScroll(e) {
    if (isScrolling) return;
    
    // 只处理首页
    if (!document.getElementById('home').classList.contains('active')) return;

    const heroSection = document.querySelector('.hero');
    const gamesSection = document.getElementById('games-section');
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
    
    // 如果当前在英雄区域且向下滚动
    if (window.scrollY < heroSection.offsetHeight && scrollDirection === 'down') {
        isScrolling = true;
        window.scrollTo({
            top: gamesSection.offsetTop,
            behavior: 'smooth'
        });
        setTimeout(() => { isScrolling = false; }, 1000);
    }
    // 如果当前在游戏区域顶部且向上滚动
    else if (window.scrollY > heroSection.offsetHeight - 100 && scrollDirection === 'up') {
        isScrolling = true;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => { isScrolling = false; }, 1000);
    }
}

// ==================== 页面初始化 ====================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    // 初始检查当前页面
    checkPageAndSetHeader();

    // 获取全局元素引用
    const logo = document.querySelector('.logo img');
    const navLinks = document.querySelectorAll('.nav-links a');

    // 监听滚动事件，动态修改导航栏样式
    window.addEventListener('scroll', function() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition < heroHeight) {
            setHeaderDarkMode(logo, navLinks);
        } else {
            setHeaderLightMode(logo, navLinks);
        }
    });

    // 创建星空背景
    particlesJS('particles-js', {
        particles: {
            number: { value: 20, density: { enable: true, value_area: 2000 } },
            color: { value: "#e74c3c" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 600,
                color: "#f39c12",
                opacity: 0.4,
                width: 2
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        }
    });

    // 设置深色导航模式
    function setHeaderDarkMode(logo, navLinks) {
        const header = document.querySelector('header');
        logo = document.querySelector('.logo img');
        navLinks = document.querySelectorAll('.nav-links a');
        header.style.background = 'rgba(40, 40, 40, 0.8)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        if(logo) logo.src = 'images/tuziLogo1.png';
        if(navLinks) navLinks.forEach(link => {
            link.style.color = '#fff';
        });
    }

    // 设置浅色导航模式
    function setHeaderLightMode(logo, navLinks) {
        const header = document.querySelector('header');
        logo = document.querySelector('.logo img');
        navLinks = document.querySelectorAll('.nav-links a');
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = '0 2px 10px rgba(200, 200, 200, 0.3)';
        if(logo) logo.src = 'images/tuziLogo.png';
        if(navLinks) navLinks.forEach(link => {
            link.style.color = '#444';
        });
    }

    // 页面切换时检查
    function checkPageAndSetHeader() {
        if (!document.getElementById('home').classList.contains('active')) {
            setHeaderDarkMode();
        }
    }
    
    // 其他初始化代码...
    showPage('home');
    filterGames('all');
    window.addEventListener('wheel', handleHomeScroll, { passive: false });
});

// ==================== 文章系统 ====================

/**
 * 显示文章页面
 * @param {string} articleId - 文章ID
 */
function showArticle(articleId) {
    // 加载文章内容
    loadArticleData(articleId);
    
    // 显示文章页面
    showPage('article');
}

/**
 * 加载文章数据
 * @param {string} articleId - 文章ID
 */
function loadArticleData(articleId) {
    const articles = {
        'article1': {
            title: 'HTML5游戏市场迎来爆发式增长',
            date: '2023-10-15',
            author: '张明',
            category: '行业分析',
            content: `
                <h1 class="article-title">HTML5游戏市场迎来爆发式增长</h1>
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> 2023-10-15</span>
                    <span><i class="far fa-user"></i> 作者: 张明</span>
                    <span><i class="far fa-folder"></i> 分类: 行业分析</span>
                </div>
                <div class="article-image" style="background: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center/cover;"></div>
                <div class="article-content">
                    <p>最新行业报告显示，2023年HTML5游戏市场规模同比增长35%，轻量级游戏成为市场新宠。随着移动设备性能的提升和5G网络的普及，HTML5游戏在跨平台兼容性和即时游玩体验上的优势日益凸显，吸引了大量休闲玩家和开发者加入这一领域。</p>
                    
                    <h3>市场增长驱动因素</h3>
/**
 * 根据文章ID加载并渲染对应的文章内容到页面。
 * 如果未找到匹配的文章ID，则默认加载第一篇文章（article1）。
 *
 * @param {string} articleId - 文章的唯一标识符（例如："article1" 或 "article2"）。
 * @returns {void} 无返回值，直接操作DOM将文章内容渲染到页面中。
 */
                    <p>HTML5游戏市场的快速增长主要得益于以下几个因素：</p>
                    <ul>
                        <li><strong>移动设备性能提升</strong>：现代智能手机的处理能力足以流畅运行复杂的HTML5游戏</li>
                        <li><strong>5G网络普及</strong>：高速网络使得游戏加载时间大幅缩短，提升了用户体验</li>
                        <li><strong>跨平台兼容性</strong>：HTML5游戏可以在各种设备上运行，无需下载安装</li>
                        <li><strong>社交平台整合</strong>：微信、抖音等社交平台为HTML5游戏提供了巨大的流量入口</li>
                    </ul>
                    
                    <h3>开发者生态日趋成熟</h3>
                    <p>随着HTML5游戏市场的扩大，开发者生态也日趋成熟。目前市场上有多种成熟的HTML5游戏引擎可供选择：</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div style="padding: 20px; background: var(--light); border-radius: 10px; box-shadow: var(--shadow);">
                            <h4>Phaser</h4>
                            <p>最受欢迎的HTML5游戏框架之一，拥有强大的社区支持和丰富的插件生态</p>
                        </div>
                        <div style="padding: 20px; background: var(--light); border-radius: 10px; box-shadow: var(--shadow);">
                            <h4>PixiJS</h4>
                            <p>专注于2D渲染性能的引擎，适合需要高性能表现的游戏项目</p>
                        </div>
                        <div style="padding: 20px; background: var(--light); border-radius: 10px; box-shadow: var(--shadow);">
                            <h4>Three.js</h4>
                            <p>强大的WebGL库，可用于创建复杂的3D HTML5游戏</p>
                        </div>
                    </div>
                    
                    <h3>未来发展趋势</h3>
                    <p>展望未来，HTML5游戏市场仍有巨大的增长空间：</p>
                    <ol>
                        <li><strong>混合变现模式</strong>：广告和内购结合的混合变现模式将成为主流</li>
                        <li><strong>社交游戏深化</strong>：社交元素将更深地融入游戏设计，增强用户粘性</li>
                        <li><strong>云游戏整合</strong>：HTML5游戏将与云游戏技术结合，提供更高质量的游戏体验</li>
                        <li><strong>海外市场拓展</strong>：中国开发者将加速向海外市场扩张</li>
                    </ol>
                    
                    <p>随着技术的进步和市场的发展，HTML5游戏有望在游戏产业中占据更重要的位置，成为连接玩家和开发者的重要桥梁。</p>
                </div>
            `
        },
        'article2': {
            title: '休闲游戏设计新趋势分析',
            date: '2023-10-12',
            author: '李华',
            category: '设计趋势',
            content: `
                <h1 class="article-title">休闲游戏设计新趋势分析</h1>
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> 2023-10-12</span>
                    <span><i class="far fa-user"></i> 作者: 李华</span>
                    <span><i class="far fa-folder"></i> 分类: 设计趋势</span>
                </div>
                <div class="article-content">
                    <p>随着移动游戏市场的不断发展，休闲游戏的设计也在不断进化。本文分析了当前休闲游戏设计的新趋势...</p>
                </div>
            `
        }
    };
    
    const article = articles[articleId] || articles['article1'];
    document.getElementById('article-content').innerHTML = article.content;
}

// ==================== 注释掉的备用功能 ====================

/*
// 自定义光标逻辑
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// 悬停效果
const hoverElements = document.querySelectorAll('a, button, .game-card, .feature-card, .scroll-indicator');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
});

// 游戏分类筛选功能
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 更新活动按钮
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        
        // 获取选中的分类
        const category = this.getAttribute('data-category');
        
        // 过滤游戏
        filterGames(category);
    });
});

// 游戏搜索功能    
document.getElementById('game-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filterGames('all', searchTerm);
});
*/