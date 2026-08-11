/* =========================================
   STARFIELD
========================================= */

const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");

let stars = [];

function resizeStars() {

    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

    stars = [];

    for (let i = 0; i < 220; i++) {

        stars.push({

            x: Math.random() * starCanvas.width,

            y: Math.random() * starCanvas.height,

            radius: Math.random() * 1.5,

            speed:
                Math.random() * .3 + .05,

            opacity:
                Math.random() * .8 + .2

        });

    }

}

function drawStars() {

    starCtx.clearRect(
        0,
        0,
        starCanvas.width,
        starCanvas.height
    );

    stars.forEach(star => {

        star.y += star.speed;

        if (star.y > starCanvas.height) {
            star.y = 0;
        }

        starCtx.beginPath();

        starCtx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        starCtx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        starCtx.fill();

    });

    requestAnimationFrame(drawStars);

}

resizeStars();
drawStars();

window.addEventListener(
    "resize",
    resizeStars
);


/* =========================================
   HEART CURSOR
========================================= */

let lastHeart = 0;

document.addEventListener(
    "mousemove",
    e => {

        const now = Date.now();

        if (now - lastHeart < 80) return;

        lastHeart = now;

        const heart =
            document.createElement("div");

        heart.className =
            "cursor-heart";

        heart.innerHTML =
            Math.random() > .5 ? "♥" : "♡";

        heart.style.left =
            `${e.clientX}px`;

        heart.style.top =
            `${e.clientY}px`;

        document
            .getElementById("cursor-hearts")
            .appendChild(heart);

        setTimeout(
            () => heart.remove(),
            1000
        );

    }
);


/* =========================================
   ROSE PETALS
========================================= */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className = "petal";

    petal.innerHTML =
        Math.random() > .4 ? "🌹" : "🌸";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        10 + Math.random() * 14 + "px";

    petal.style.animationDuration =
        6 + Math.random() * 8 + "s";

    document
        .getElementById("petals")
        .appendChild(petal);

    setTimeout(
        () => petal.remove(),
        15000
    );

}

setInterval(createPetal, 700);


/* =========================================
   ANNIVERSARY COUNTER
========================================= */

const anniversary =
    new Date("2025-08-12T00:00:00");

function updateCounter() {

    const now = new Date();

    const difference =
        Math.max(
            0,
            now - anniversary
        );

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        ) % 24;

    const minutes =
        Math.floor(
            totalSeconds / 60
        ) % 60;

    const seconds =
        totalSeconds % 60;

    document.getElementById("days")
        .textContent = days;

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2,"0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2,"0");

}

updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById("envelope");

envelope.addEventListener(
    "click",
    () => {

        envelope.classList.toggle("open");

    }
);


/* =========================================
   MUSIC PLAYER
========================================= */

const music =
    document.getElementById("ourSong");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

const equalizer =
    document.getElementById("equalizer");

musicButton.addEventListener(
    "click",
    async () => {

        if (music.paused) {

            try {

                await music.play();

                musicIcon.textContent = "Ⅱ";

                equalizer.classList.add(
                    "playing"
                );

            } catch {

                alert(
                    "Add your music file as music/our-song.mp3 ❤️"
                );

            }

        } else {

            music.pause();

            musicIcon.textContent = "▶";

            equalizer.classList.remove(
                "playing"
            );

        }

    }
);


/* =========================================
   SOULMATE METER
========================================= */

let meterAnimated = false;

function animateMeter() {

    if (meterAnimated) return;

    meterAnimated = true;

    const circle =
        document.getElementById(
            "meterProgress"
        );

    const number =
        document.getElementById(
            "meterNumber"
        );

    circle.style.strokeDashoffset = "0";

    let value = 0;

    const interval =
        setInterval(() => {

            value++;

            number.textContent =
                value;

            if (value >= 100) {

                clearInterval(interval);

            }

        }, 22);

}


/* =========================================
   REASONS CAROUSEL
========================================= */

const reasons = [

    {
        title: "Your smile",
        text:
            "Because somehow your smile can make even my worst days feel okay."
    },

    {
        title: "Your heart",
        text:
            "You care so deeply, and that's one of the things I love most about you."
    },

    {
        title: "Your laugh",
        text:
            "I could hear you laugh a thousand times and still smile every single time."
    },

    {
        title: "Your craziness",
        text:
            "Because life would be ridiculously boring without your cute little chaos."
    },

    {
        title: "The way you love",
        text:
            "You make me feel wanted, understood and loved even from miles away."
    },

    {
        title: "Simply you",
        text:
            "I could write a thousand reasons and still never explain why my heart chose you."
    }

];

let reasonIndex = 0;

const reasonTitle =
    document.getElementById("reasonTitle");

const reasonText =
    document.getElementById("reasonText");

const reasonDots =
    document.getElementById("reasonDots");

reasons.forEach(
    (_, index) => {

        const dot =
            document.createElement("div");

        dot.className =
            "reason-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        reasonDots.appendChild(dot);

    }
);

function showReason(index) {

    reasonIndex =
        (index + reasons.length)
        % reasons.length;

    reasonTitle.textContent =
        reasons[reasonIndex].title;

    reasonText.textContent =
        reasons[reasonIndex].text;

    document
        .querySelectorAll(".reason-dot")
        .forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === reasonIndex
                );

            }
        );

}

document
    .getElementById("nextReason")
    .onclick =
    () => showReason(reasonIndex + 1);

document
    .getElementById("prevReason")
    .onclick =
    () => showReason(reasonIndex - 1);


/* =========================================
   PROMISE RING
========================================= */

const ring =
    document.getElementById(
        "ringContainer"
    );

const promise =
    document.getElementById(
        "promiseText"
    );

ring.addEventListener(
    "click",
    () => {

        promise.classList.toggle(
            "visible"
        );

        ring.querySelector(
            ".ring"
        ).style.transform =
            "scale(1.15) rotateY(360deg)";

        setTimeout(
            () => {

                ring.querySelector(
                    ".ring"
                ).style.transform = "";

            },
            700
        );

    }
);


/* =========================================
   SCROLL REVEALS
========================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                    if (
                        entry.target.classList
                            .contains("meter-section")
                    ) {

                        animateMeter();

                    }

                }

            });

        },
        {
            threshold: .15
        }
    );

document
    .querySelectorAll(".reveal")
    .forEach(
        element =>
            revealObserver.observe(element)
    );


/* =========================================
   HERO BUTTON
========================================= */

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".counter-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================
   FIREWORKS
========================================= */

const fireCanvas =
    document.getElementById(
        "fireworks"
    );

const fireCtx =
    fireCanvas.getContext("2d");

let particles = [];

function resizeFireworks() {

    fireCanvas.width =
        window.innerWidth;

    fireCanvas.height =
        window.innerHeight;

}

resizeFireworks();

window.addEventListener(
    "resize",
    resizeFireworks
);

function createFirework(
    x,
    y
) {

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const angle =
            Math.random()
            * Math.PI
            * 2;

        const speed =
            Math.random()
            * 7
            + 2;

        particles.push({

            x,
            y,

            vx:
                Math.cos(angle)
                * speed,

            vy:
                Math.sin(angle)
                * speed,

            life: 100,

            size:
                Math.random()
                * 3
                + 1

        });

    }

}

function animateFireworks() {

    fireCtx.clearRect(
        0,
        0,
        fireCanvas.width,
        fireCanvas.height
    );

    particles =
        particles.filter(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy += .05;

                particle.life--;

                fireCtx.globalAlpha =
                    particle.life / 100;

                fireCtx.beginPath();

                fireCtx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                fireCtx.fillStyle =
                    "#ff5c91";

                fireCtx.fill();

                return particle.life > 0;

            }
        );

    requestAnimationFrame(
        animateFireworks
    );

}

animateFireworks();


/* =========================================
   FINAL "I LOVE YOU TOO"
========================================= */

document
    .getElementById("loveButton")
    .addEventListener(
        "click",
        () => {

            const finalMessage =
                document.getElementById(
                    "finalMessage"
                );

            finalMessage.classList.add(
                "active"
            );

            for (
                let i = 0;
                i < 15;
                i++
            ) {

                setTimeout(
                    () => {

                        createFirework(

                            Math.random()
                            * window.innerWidth,

                            Math.random()
                            * window.innerHeight
                            * .65

                        );

                    },
                    i * 180
                );

            }

            document.body.style
                .overflow = "hidden";

        }
    );