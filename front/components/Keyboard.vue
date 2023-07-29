<script setup lang='ts'>

let allKeyElements: NodeListOf<Element>

onMounted(function () {

    allKeyElements = document.querySelectorAll("#keyboard>svg")
    let textarea = document.querySelector('#typing-textarea') as HTMLTextAreaElement | null

    if (textarea != null) {
        textarea.addEventListener('keydown', function (event) {
            highlightKey(event.code, 'active')
        })

        textarea.addEventListener('keyup', function (event) {
            highlightKey(event.code)
        })
    }
})




function highlightKey(key: string, className: string = '') {

    allKeyElements.forEach(keyElement => {
        if (keyElement.getAttribute("data-key") == key) {

            if (className == '') {
                keyElement.classList.remove("active")
            } else {
                keyElement.classList.add("active")
            }
            return
        }
    });
}


</script>
<template>
    <div class="keyboard-container">
        <svg class="keyboard" id="keyboard" viewBox="0 0 642 215">

            <!-- 1 -->
            <svg class="key multi" data-key="Backquote" x="0" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">~</text>
                <text x="10" y="30">`</text>
            </svg>
            <svg class="key multi" data-key="Digit1" x="43" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">!</text>
                <text x="10" y="30">1</text>
            </svg>
            <svg class="key multi" data-key="Digit2" x="86" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">@</text>
                <text x="10" y="30">2</text>
            </svg>
            <svg class="key multi" data-key="Digit3" x="129" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">#</text>
                <text x="10" y="30">3</text>
            </svg>
            <svg class="key multi" data-key="Digit4" x="172" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">$</text>
                <text x="10" y="30">4</text>
            </svg>
            <svg class="key multi" data-key="Digit5" x="215" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">%</text>
                <text x="10" y="30">5</text>
            </svg>
            <svg class="key multi" data-key="Digit6" x="258" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">^</text>
                <text x="10" y="30">6</text>
            </svg>
            <svg class="key multi" data-key="Digit7" x="301" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">&</text>
                <text x="10" y="30">7</text>
            </svg>
            <svg class="key multi" data-key="Digit8" x="344" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">*</text>
                <text x="10" y="30">8</text>
            </svg>
            <svg class="key multi" data-key="Digit9" x="387" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">(</text>
                <text x="10" y="30">9</text>
            </svg>
            <svg class="key multi" data-key="Digit0" x="430" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">)</text>
                <text x="10" y="30">0</text>
            </svg>
            <svg class="key multi" data-key="Minus" x="473" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">&#8212;</text>
                <text x="10" y="30">-</text>
            </svg>
            <svg class="key multi" data-key="Equal" x="516" y="0">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">+</text>
                <text x="10" y="30">=</text>
            </svg>
            <svg class="key multi" data-key="Backspace" x="559" y="0">
                <rect x="0" y="0" width="83" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Backspace</text>
            </svg>


            <!-- 2 -->
            <svg class="key multi" data-key="" x="0" y="43">
                <rect x="0" y="0" width="63" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Tab</text>
            </svg>
            <svg class="key" data-key="KeyQ" x="66" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">Q</text>
            </svg>
            <svg class="key" data-key="KeyW" x="109" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">W</text>
            </svg>
            <svg class="key" data-key="KeyE" x="152" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">E</text>
            </svg>
            <svg class="key" data-key="KeyR" x="195" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">R</text>
            </svg>
            <svg class="key" data-key="KeyT" x="238" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">T</text>
            </svg>
            <svg class="key" data-key="KeyY" x="281" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">Y</text>
            </svg>
            <svg class="key" data-key="KeyU" x="324" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">U</text>
            </svg>
            <svg class="key" data-key="KeyI" x="367" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">I</text>
            </svg>
            <svg class="key" data-key="KeyO" x="410" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">O</text>
            </svg>
            <svg class="key" data-key="KeyP" x="453" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">P</text>
            </svg>
            <svg class="key multi" data-key="BracketLeft" x="496" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">{</text>
                <text x="10" y="30">[</text>
            </svg>
            <svg class="key multi" data-key="BracketRight" x="539" y="43">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">}</text>
                <text x="10" y="30">]</text>
            </svg>
            <svg class="key multi" data-key="Backslash" x="582" y="43">
                <rect x="0" y="0" width="60" height="40" rx="4" ry="4"/>
                <text x="10" y="15">|</text>
                <text x="10" y="30">\</text>
            </svg>

            <!-- 3 -->
            <svg class="key multi" data-key="CapsLock" x="0" y="86">
                <rect x="0" y="0" width="80" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Caps Lock</text>
            </svg>
            <svg class="key" data-key="KeyA" x="83" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">A</text>
            </svg>
            <svg class="key" data-key="KeyS" x="126" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">S</text>
            </svg>
            <svg class="key" data-key="KeyD" x="169" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">D</text>
            </svg>
            <svg class="key" data-key="KeyF" x="212" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">F</text>
            </svg>
            <svg class="key" data-key="KeyG" x="255" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">G</text>
            </svg>
            <svg class="key" data-key="KeyH" x="298" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">H</text>
            </svg>
            <svg class="key" data-key="KeyJ" x="341" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">J</text>
            </svg>
            <svg class="key" data-key="KeyK" x="384" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">K</text>
            </svg>
            <svg class="key" data-key="KeyL" x="427" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">L</text>
            </svg>
            <svg class="key multi big" data-key="Semicolon" x="470" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">:</text>
                <text x="10" y="30">;</text>
            </svg>
            <svg class="key multi big" data-key="Quote" x="513" y="86">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">"</text>
                <text x="10" y="30">'</text>
            </svg>
            <svg class="key multi" data-key="Enter" x="556" y="86">
                <rect x="0" y="0" width="86" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Enter</text>
            </svg>

            <!-- 4 -->
            <svg class="key multi" data-key="ShiftLeft" x="0" y="129">
                <rect x="0" y="0" width="92" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Shift</text>
            </svg>
            <svg class="key" data-key="KeyZ" x="95" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">Z</text>
            </svg>
            <svg class="key" data-key="KeyX" x="138" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">X</text>
            </svg>
            <svg class="key" data-key="KeyC" x="181" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">C</text>
            </svg>
            <svg class="key" data-key="KeyV" x="224" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">V</text>
            </svg>
            <svg class="key" data-key="KeyB" x="267" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">B</text>
            </svg>
            <svg class="key" data-key="KeyN" x="310" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">N</text>
            </svg>
            <svg class="key" data-key="KeyM" x="353" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="13" y="26">M</text>
            </svg>
            <svg class="key multi big" data-key="Comma" x="396" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">&lt;</text>
                <text x="10" y="30">,</text>
            </svg>
            <svg class="key multi big" data-key="Period" x="439" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">></text>
                <text x="10" y="30">.</text>
            </svg>
            <svg class="key multi" data-key="Slash" x="482" y="129">
                <rect x="0" y="0" width="40" height="40" rx="4" ry="4"/>
                <text x="10" y="15">?</text>
                <text x="10" y="30">/</text>
            </svg>
            <svg class="key multi" data-key="ShiftRight" x="525" y="129">
                <rect x="0" y="0" width="117" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Shift</text>
            </svg>

            <!-- 5 -->
            <svg class="key multi" data-key="ControlLeft" x="0" y="172">
                <rect x="0" y="0" width="63" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Ctrl</text>
            </svg>
            <svg class="key multi" data-key="" x="66" y="172">
                <rect x="0" y="0" width="63" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Alt</text>
            </svg>
            <svg class="key multi" data-key="Space" x="132" y="172">
                <rect x="0" y="0" width="369" height="40" rx="4" ry="4"/>
            </svg>
            <svg class="key multi" data-key="" x="504" y="172">
                <rect x="0" y="0" width="63" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Alt</text>
            </svg>
            <svg class="key multi" data-key="ControlRight" x="570" y="172">
                <rect x="0" y="0" width="72" height="40" rx="4" ry="4"/>
                <text x="12" y="25">Ctrl</text>
            </svg>
        </svg>
    </div>
</template>
<style scoped>
.keyboard-container {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
}


.keyboard {
    max-width: 800px;
    margin: auto;
    width: 100%;
    background-color: var(--keyboard-color);
    outline: 12px solid var(--keyboard-color);
    border-radius: 1px;
}

.keyboard .key.active rect{
    fill: var(--color-secondary);
}

.keyboard .key.active text{
    fill: white;
}

.keyboard .key rect{
    fill: white;
    transition: fill 100ms;
}

.keyboard .key{
    font-size: 16px;
}

.keyboard .multi{
    font-size: 12px;
}

.keyboard text{
    fill: var(--color-on-surface);
}

.keyboard .multi.big{
    font-size: 14px;
}


</style>




