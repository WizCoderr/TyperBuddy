<script setup lang='ts'>
</script>
<template>
    <footer>
        <section>
            <div class="page">
                <div>
                    <div class="info">
                        <NuxtLink to="/" class="logo">TyperBuddy</NuxtLink>
                        <p>Join TyperBuddy to improve your typing skills through fun practice exercises, multiplayer
                            challenges,
                            and detailed progress tracking. Become a typing master with us!
                        </p>
                        <p class="copyright">© 2024 TyperBuddy. All rights reserved.</p>
                    </div>
                    <div class="links">
                        <h4>LINKS</h4>
                        <NuxtLink to="/game/practice">Practice</NuxtLink>
                        <NuxtLink to="/game/multiplayer">Multiplayer</NuxtLink>
                        <NuxtLink to="/game/play-with-friends">Play with Friends</NuxtLink>
                        <NuxtLink to="/game/typing-test">Typing Test</NuxtLink>
                        <NuxtLink to="/game/leaderboard">Leaderboard</NuxtLink>
                        <NuxtLink to="/blogs">Blogs</NuxtLink>

                    </div>
                    <div class="links">
                        <h4>COMPANY</h4>
                        <NuxtLink to="/company/about">About us</NuxtLink>
                        <NuxtLink to="/company/contact">Contact us</NuxtLink>
                        <NuxtLink to="/company/community-guideline">Guidelines</NuxtLink>
                        <NuxtLink to="/company/cookies-policy">Cookies</NuxtLink>
                        <NuxtLink to="/company/terms-and-conditions">Term & conditions</NuxtLink>
                        <NuxtLink to="/company/privacy">Privacy</NuxtLink>
                        <NuxtLink to="/company/faq">FAQ</NuxtLink>
                        <NuxtLink to="/company/report-bugs">Report bugs</NuxtLink>
                        <NuxtLink to="/company/careers">Careers</NuxtLink>

                    </div>
                    <div class="links">
                        <h4>CONTACT</h4>
                        <p>teamflaxstudio@gmail.com</p>
                    </div>
                </div>

            </div>
        </section>
    </footer>
</template>
<style scoped>
footer {
    background-color: rgb(55, 61, 69);
}

footer .page>div {
    padding-top: 5em;
    padding-bottom: 5em;
    min-height: 400px;
    display: grid;
    gap: 1em;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
}

footer .info {
    margin-right: 1em;
}

footer a,
footer p {
    color: rgba(235, 235, 235, 0.74);
    transition: all 200ms
}

footer a:hover {
    color: white;
}

footer h4 {
    color: white;
}

footer .logo {
    font-size: var(--big-font);
    color: white !important;
    margin-bottom: 0.5em;
    display: block;
}

footer a {
    display: block;
    line-height: 2em;
}

footer .copyright {
    margin-top: 1.5em;
}
</style>