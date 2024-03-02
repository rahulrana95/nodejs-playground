"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/user', (req, res) => {
    res.status(200);
    res.json({
        username: 'rahul'
    });
    res.send();
});
exports.default = router;
//# sourceMappingURL=index.js.map