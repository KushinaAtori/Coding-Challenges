function searchFunction(a, x)
	for key, value in pairs(a) do
		if a[key] == x then
			print(x .. " is present at index: " .. key);
			return key;
		else
			
		end
	end
end
