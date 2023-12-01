const bubbleProperty = {
    initialBubble : {
        indexOfBubbleContainer: {zIndex: -1},
        paddingOpacityOfBubble: {paddingTop: '360px', opacity: 0},
        classAnim: false
    },
    
    terminalBubble : {
        indexOfBubbleContainer: {zIndex: 1},
        paddingOpacityOfBubble: {paddingTop: '360px', opacity: 0},
        classAnim: true
    }
}

const styleController =  {
    initialize: (setBubbleStyle)=>{
        setBubbleStyle(bubbleProperty.initialBubble);
    },
    finalize: (setBubbleStyle)=>{
        setBubbleStyle(bubbleProperty.terminalBubble)
    },
    isInitial: (bubbleStyle)=>{
        return JSON.stringify(bubbleStyle)===JSON.stringify(bubbleProperty.initialBubble)
    }
}

export default {
    bubbleProperty, styleController
};