#!/bin/bash
FILES=./raw/*.njk
for f in $FILES
do
  FILENAME=$(basename "$f" | cut -d. -f1)
  echo "Processing ${FILENAME} mail template..."
  npx inline-email --force --css raw/styles.css --out email/${FILENAME}.html.njk $f
  cat $f | npx html-to-text --tables=.address > email/${FILENAME}.text.njk
done