#!/bin/bash
if [ $TRAVIS_PULL_REQUEST = "false" ]; then
    # Package for the right os
    if [ "$TRAVIS_OS_NAME" == "osx" ]; then
        npm run package-mac
    fi
    if [ "$TRAVIS_OS_NAME" == "linux" ]; then
        npm run package-linux
    fi
    # Clean the release folder by letting
    find release -mindepth 1 ! \( -name '*.deb' -o -name '*.dmg' \) -exec rm -rf {} +
    # Create the latest files
    for file in release/*; do
        cp ${file} ${file/_[0-9]*_/_latest_};
    done
fi