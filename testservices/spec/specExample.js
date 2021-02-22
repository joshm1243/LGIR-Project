describe("CheckIfTen", function() {  
    it("should be defined and in scope",function() {    
        expect(CheckIfTen).toBeDefined()
    })

    it("should return true if argument is the number ten", function(){
        expect(CheckIfTen(10)).toBe(true)
    })

    it("should return false if argument is not the number ten", function(){
        expect(CheckIfTen(432)).toBe(false)
    })

    it("should return false if any strings are passed", function(){
        expect(CheckIfTen("10")).toBe(false)
    })
})



