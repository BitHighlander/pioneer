for dir in modules/*; do $(cd "$dir" && npm update) &; done &
for dir in services/*; do cd "$dir" && npm update &; done &
