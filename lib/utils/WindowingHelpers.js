const WindowingHelpers = {
    getBufferSize: function(pageSize, bufferPages) {
        return bufferPages * pageSize;
    },
    getRowsToSkip: function(visiblePageFirstElementIndex, rowsToBuffer) {
        const offsetIndex = visiblePageFirstElementIndex - rowsToBuffer;
        return offsetIndex > 0 ? offsetIndex : 0;
    },
    getNumberOfElementsToRender: function(rowsToSkip, bufferSize) {
        if (rowsToSkip === 0) {
            return bufferSize * 2;
        }

        return bufferSize * 3;
    }
};

module.exports = WindowingHelpers;
