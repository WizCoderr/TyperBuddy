<script setup lang='ts'>
</script>
<template>
    <div class="container">
        <div class="keyboard-container">
            <div class="keyboard">
                <div class="row-14">
                    <div class="square multi">
                        <span>~</span>
                        <span>`</span>
                    </div>
                    <div class="square multi">
                        <span>!</span>
                        <span>1</span>
                    </div>
                    <div class="square multi">
                        <span>@</span>
                        <span>2</span>
                    </div>
                    <div class="square multi">
                        <span>#</span>
                        <span>3</span>
                    </div>
                    <div class="square multi">
                        <span>$</span>
                        <span>4</span>
                    </div>
                    <div class="square multi">
                        <span>%</span>
                        <span>5</span>
                    </div>
                    <div class="square multi">
                        <span>^</span>
                        <span>6</span>
                    </div>
                    <div class="square multi">
                        <span>&</span>
                        <span>7</span>
                    </div>
                    <div class="square multi">
                        <span>*</span>
                        <span>8</span>
                    </div>
                    <div class="square multi">
                        <span>&#40;</span>
                        <span>9</span>
                    </div>
                    <div class="square multi">
                        <span>&#41;</span>
                        <span>0</span>
                    </div>
                    <div class="square multi">
                        <span>&#8212;</span>
                        <span>-</span>
                    </div>
                    <div class="square multi">
                        <span>+</span>
                        <span>=</span>
                    </div>
                    <div class="wide-2 single">
                        <span>Backspace</span>
                    </div>
                </div>
                <div class="row-14">
                    <div class="wide-1-5 single">
                        <span>Tab</span>
                    </div>
                    <div class="square single">
                        <span>Q</span>
                    </div>
                    <div class="square single">
                        <span>W</span>
                    </div>
                    <div class="square single">
                        <span>E</span>
                    </div>
                    <div class="square single">
                        <span>R</span>
                    </div>
                    <div class="square single">
                        <span>T</span>
                    </div>
                    <div class="square single">
                        <span>Y</span>
                    </div>
                    <div class="square single">
                        <span>U</span>
                    </div>
                    <div class="square single">
                        <span>I</span>
                    </div>
                    <div class="square single">
                        <span>O</span>
                    </div>
                    <div class="square single">
                        <span>P</span>
                    </div>
                    <div class="square multi">
                        <span>{</span>
                        <span>[</span>
                    </div>
                    <div class="square multi">
                        <span>}</span>
                        <span>]</span>
                    </div>
                    <div class="wide-1-5 multi">
                        <span>|</span>
                        <span>\</span>
                    </div>
                </div>
                <div class="row-13">
                    <div class="wide-1-7 single">
                        <span>Caps Lock</span>
                    </div>
                    <div class="square single">
                        <span>A</span>
                    </div>
                    <div class="square single">
                        <span>S</span>
                    </div>
                    <div class="square single">
                        <span>D</span>
                    </div>
                    <div class="square single">
                        <span>F</span>
                    </div>
                    <div class="square single">
                        <span>G</span>
                    </div>
                    <div class="square single">
                        <span>H</span>
                    </div>
                    <div class="square single">
                        <span>J</span>
                    </div>
                    <div class="square single">
                        <span>K</span>
                    </div>
                    <div class="square single">
                        <span>L</span>
                    </div>
                    <div class="square multi">
                        <span>:</span>
                        <span>;</span>
                    </div>
                    <div class="square multi">
                        <span>"</span>
                        <span>'</span>
                    </div>
                    <div class="wide-2-3 single">
                        <span>Enter</span>
                    </div>
                </div>
                <div class="row-12">
                    <div class="wide-2-3 single">
                        <span>Shift</span>
                    </div>
                    <div class="square single">
                        <span>Z</span>
                    </div>
                    <div class="square single">
                        <span>X</span>
                    </div>
                    <div class="square single">
                        <span>C</span>
                    </div>
                    <div class="square single">
                        <span>V</span>
                    </div>
                    <div class="square single">
                        <span>B</span>
                    </div>
                    <div class="square single">
                        <span>N</span>
                    </div>
                    <div class="square single">
                        <span>M</span>
                    </div>
                    <div class="square multi">
                        <span>&#60;</span>
                        <span>,</span>
                    </div>
                    <div class="square multi">
                        <span>&#62;</span>
                        <span>.</span>
                    </div>
                    <div class="square multi">
                        <span>?</span>
                        <span>/</span>
                    </div>
                    <div class="wide-2-5 single">
                        <span>Shift</span>
                    </div>
                </div>
                <div class="row-5">
                    <div class="wide-2 single">
                        <span>Ctrl</span>
                    </div>
                    <div class="wide-2 single">
                        <span>Alt</span>
                    </div>
                    <div class="wide-6 single">
                        <span>Space</span>
                    </div>
                    <div class="wide-2 single">
                        <span>Alt</span>
                    </div>
                    <div class="wide-2 single">
                        <span>Ctrl</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.keyboard-container {
    background-color: var(--keyboard-color);
    max-width: 821px;
    width: 100%;
    margin: auto;
}

.keyboard {
    padding: 1rem;
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


.keyboard .row-14 {
    display: grid;
    grid-template-columns: repeat(14, max-content);
    gap: 3px;
    margin-bottom: 3px;
}

.keyboard .row-13 {
    display: grid;
    grid-template-columns: repeat(13, max-content);
    gap: 3px;
    margin-bottom: 3px;
}

.keyboard .row-12 {
    display: grid;
    grid-template-columns: repeat(12, max-content);
    gap: 3px;
    margin-bottom: 3px;
}

.keyboard .row-5 {
    display: grid;
    grid-template-columns: repeat(5, max-content);
    gap: 3px;
    margin-bottom: 3px;
}

.keyboard .square {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-2 {
    width: 100px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-1-5 {
    width: 75px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-1-7 {
    width: 85px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-2-3 {
    width: 118px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-6 {
    width: 377px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}

.keyboard .wide-2-5 {
    width: 138px;
    height: 50px;
    background-color: white;
    border-radius: var(--keyboard-key-radius);
}
</style>