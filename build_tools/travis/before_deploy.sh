#!/bin/bash
if [ $TRAVIS_PULL_REQUEST = "false" ]; then
    # Clean the release folder by letting
    find release -mindepth 1 ! \( -name '*.deb' -o -name '*.dmg' \) -exec rm -rf {} +

    ls release

    if [ "$TRAVIS_OS_NAME" == "osx" ]; then
        # Electron builder create file of the form analytics-X.X.X.dmg on mac
        # we rename into analytics_X.X.X_mac.dmg
        for file in release/*; do
            filename=${file%%.dmg};
            mv $file ${filename/-/_}_mac.dmg;
        done
    fi

    # Create file analytics_latest_*.dmg
    for file in release/*; do
        cp ${file} ${file/_[0-9]*_/_latest_};
    done
fi