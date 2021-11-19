'use strict';

const glob = require("glob").sync;

/** 
 * Search for file in directory and get path
 * relative to root.
 * 
 * @param {array} dirs Directories to search
 * @param {string} root Path to append to directory
 * 
*/
module.exports = function( dirs ) {

    var sourcePath = {
        dirs,
        root: '../../'
    }

    /**
     * Loop through directories for matching file
     * 
     * @param {string} file Name of file to match
     * 
     * @return Path to file
     */
    var getPath = function( file ) {
        const DIRS = sourcePath.dirs;
        const root = sourcePath.root;

        // loop through dirs and find file
        for ( let i = 0, n = DIRS.length; i < n; ++i ) {
            // set cwd
            let dir = DIRS[i];
            let opts = {
                cwd: dir,
            }

            let match = glob( file, opts );
            if ( match.length ) {
                return root + dir + match[0];
            }
        }
        return false;
    }
    return getPath;
}