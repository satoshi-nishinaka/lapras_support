#!/bin/bash

for size in 16 48 128
do
  convert public/icons/source.png -resize ${size}x  -unsharp 1.5x1+0.7+0.02 public/icons/${size}.png
done
