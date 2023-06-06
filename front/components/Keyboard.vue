<script setup lang='ts'>

let allKeyElements: NodeListOf<Element>

onMounted(function () {
    window.onkeydown = onKeyDown
    window.onkeyup = onKeyUp
    allKeyElements = document.querySelectorAll("#keyboard .row>div")
})


function onKeyDown(event: KeyboardEvent) {
    console.log(event.code)
    highlightKey(event.code, "active")
}

function onKeyUp(event: KeyboardEvent) {
    //console.log(event.code)
    highlightKey(event.code)
}

function highlightKey(key: string, className: string = '') {

    allKeyElements.forEach(keyElement => {
        if (keyElement.getAttribute("data-key") == key) {

            if(className == ''){
                keyElement.classList.remove("active")
            }else{
                keyElement.classList.add("active")
            }
            return
        }
    });
}


</script>
<template>
    <div class="keyboard-container">
        <div class="keyboard" id="keyboard">
            <div class="row row-14">
                <div data-key="Backquote" class="square multi">
                    <span>~</span>
                    <span>&#96;</span>
                </div>
                <div data-key="Digit1" class="square multi">
                    <span>!</span>
                    <span>1</span>
                </div>
                <div data-key="Digit2" class="square multi">
                    <span>@</span>
                    <span>2</span>
                </div>
                <div data-key="Digit3" class="square multi">
                    <span>#</span>
                    <span>3</span>
                </div>
                <div data-key="Digit4" class="square multi">
                    <span>$</span>
                    <span>4</span>
                </div>
                <div data-key="Digit5" class="square multi">
                    <span>%</span>
                    <span>5</span>
                </div>
                <div data-key="Digit6" class="square multi">
                    <span>^</span>
                    <span>6</span>
                </div>
                <div data-key="Digit7" class="square multi">
                    <span>&</span>
                    <span>7</span>
                </div>
                <div data-key="Digit8" class="square multi">
                    <span>*</span>
                    <span>8</span>
                </div>
                <div data-key="Digit9" class="square multi">
                    <span>&#40;</span>
                    <span>9</span>
                </div>
                <div data-key="Digit0" class="square multi">
                    <span>&#41;</span>
                    <span>0</span>
                </div>
                <div data-key="Minus" class="square multi">
                    <span>&#8212;</span>
                    <span>-</span>
                </div>
                <div data-key="Equal" class="square multi">
                    <span>+</span>
                    <span>=</span>
                </div>
                <div data-key="Backspace" class="wide-2 single">
                    <span>Backspace</span>
                </div>
            </div>
            <div class="row row-14">
                <div data-key="" class="wide-1-5 single">
                    <span>Tab</span>
                </div>
                <div data-key="KeyQ" class="square single">
                    <span>Q</span>
                </div>
                <div data-key="KeyW" class="square single">
                    <span>W</span>
                </div>
                <div data-key="KeyE" class="square single">
                    <span>E</span>
                </div>
                <div data-key="KeyR" class="square single">
                    <span>R</span>
                </div>
                <div data-key="KeyT" class="square single">
                    <span>T</span>
                </div>
                <div data-key="KeyY" class="square single">
                    <span>Y</span>
                </div>
                <div data-key="KeyU" class="square single">
                    <span>U</span>
                </div>
                <div data-key="KeyI" class="square single">
                    <span>I</span>
                </div>
                <div data-key="KeyO" class="square single">
                    <span>O</span>
                </div>
                <div data-key="KeyP" class="square single">
                    <span>P</span>
                </div>
                <div data-key="BracketLeft" class="square multi">
                    <span>{</span>
                    <span>[</span>
                </div>
                <div data-key="BracketRight" class="square multi">
                    <span>}</span>
                    <span>]</span>
                </div>
                <div data-key="Backslash" class="wide-1-5 multi">
                    <span>|</span>
                    <span>\</span>
                </div>
            </div>
            <div class="row row-13">
                <div data-key="CapsLock" class="wide-2 single">
                    <span>Caps Lock</span>
                </div>
                <div data-key="KeyA" class="square single">
                    <span>A</span>
                </div>
                <div data-key="KeyS" class="square single">
                    <span>S</span>
                </div>
                <div data-key="KeyD" class="square single">
                    <span>D</span>
                </div>
                <div data-key="KeyF" class="square single">
                    <span>F</span>
                </div>
                <div data-key="KeyG" class="square single">
                    <span>G</span>
                </div>
                <div data-key="KeyH" class="square single">
                    <span>H</span>
                </div>
                <div data-key="KeyJ" class="square single">
                    <span>J</span>
                </div>
                <div data-key="KeyK" class="square single">
                    <span>K</span>
                </div>
                <div data-key="KeyL" class="square single">
                    <span>L</span>
                </div>
                <div data-key="Semicolon" class="square multi">
                    <span>:</span>
                    <span>;</span>
                </div>
                <div data-key="quote" class="square multi">
                    <span>"</span>
                    <span>'</span>
                </div>
                <div data-key="Enter" class="wide-2-1 single">
                    <span>Enter</span>
                </div>
            </div>
            <div class="row row-12">
                <div data-key="ShiftLeft" class="wide-2-3 single">
                    <span>Shift</span>
                </div>
                <div data-key="KeyZ" class="square single">
                    <span>Z</span>
                </div>
                <div data-key="KeyX" class="square single">
                    <span>X</span>
                </div>
                <div data-key="KeyC" class="square single">
                    <span>C</span>
                </div>
                <div data-key="KeyV" class="square single">
                    <span>V</span>
                </div>
                <div data-key="KeyB" class="square single">
                    <span>B</span>
                </div>
                <div data-key="KeyN" class="square single">
                    <span>N</span>
                </div>
                <div data-key="KeyM" class="square single">
                    <span>M</span>
                </div>
                <div data-key="Comma" class="square multi">
                    <span>&#60;</span>
                    <span>,</span>
                </div>
                <div data-key="Period" class="square multi">
                    <span>&#62;</span>
                    <span>.</span>
                </div>
                <div data-key="Slash" class="square multi">
                    <span>?</span>
                    <span>/</span>
                </div>
                <div data-key="ShiftRight" class="wide-2-5 single">
                    <span>Shift</span>
                </div>
            </div>
            <div class="row row-5">
                <div data-key="ControlLeft" class="wide-2 single">
                    <span>Ctrl</span>
                </div>
                <div data-key="" class="wide-2 single">
                    <span>Alt</span>
                </div>
                <div data-key="Space" class="wide-6 single">
                    <span>Space</span>
                </div>
                <div data-key="" class="wide-2 single">
                    <span>Alt</span>
                </div>
                <div data-key="ControlRight" class="wide-2 single">
                    <span>Ctrl</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.keyboard-container {
    background-color: var(--keyboard-color);
    max-width: max-content;
    width: 100%;
    margin: auto;
}


.keyboard {
    padding: 12px;
}

.keyboard span {
    display: block;
}

.keyboard .single {
    display: flex;
    justify-content: center;
    align-items: center;
}

.keyboard .multi {
    display: flex;
    gap: 6px;
    justify-content: center;
    flex-direction: column;
}

.keyboard .multi span {
    padding: 0 12px;
    font-size: 13px;
}

.keyboard .single span {
    font-size: 14px;
}


.keyboard .row {
    display: grid;
    gap: 3px;
    margin-bottom: 3px;
}

.keyboard .row>div {
    background-color: white;
    border-radius: var(--keyboard-key-radius);
    transition: all 50ms;
}

.keyboard .row .active {
    background-color: var(--color-primary-variant);
    color: white;
}

.keyboard .row-14 {
    grid-template-columns: repeat(14, max-content);
}

.keyboard .row-13 {
    grid-template-columns: repeat(13, max-content);
}

.keyboard .row-12 {
    grid-template-columns: repeat(12, max-content);
}

.keyboard .row-5 {
    grid-template-columns: repeat(5, max-content);
}


.keyboard .square {
    width: 50px;
    height: 50px;

}

.keyboard .wide-2 {
    width: 100px;
    height: 50px;
}

.keyboard .wide-1-5 {
    width: 75px;
    height: 50px;
}

.keyboard .wide-2-1 {
    width: 103px;
    height: 50px;
}

.keyboard .wide-2-3 {
    width: 118px;
    height: 50px;
}

.keyboard .wide-6 {
    width: 377px;
    height: 50px;
}

.keyboard .wide-2-5 {
    width: 138px;
    height: 50px;
}
</style>