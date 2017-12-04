#!/bin/bash
if [ $TRAVIS_PULL_REQUEST = "false" ]; then
    # Clean the release folder by letting
    find release -mindepth 1 ! \( -name '*.deb' -o -name '*.dmg' \) -exec rm -rf {} +

    # Create file analytics_latest_*.dmg
    for file in release/*; do
        cp ${file} ${file/_[0-9]*_/_latest_};
    done
fi